module formsjs {

  /**
   * A collection of validatable data.
   *
   * <p>Despite its name, this is not an HTMLFormElement nor does it directly interact with one.
   * This object is responsible for tracking fields/inputs and ensuring their validity before allowing a submit action.
   */
  export class Form {

    private disabled_:boolean;
    private fieldNameToAttributeMetadata_:{[fieldName:string]:AttributeMetadata};
    private formData_:any;
    private strings_:Strings;
    private submitFunction_:(data:any) => Promise<any>;
    private validationSchema_:ValidationSchema;
    private validationService_:ValidationService;
    private viewSchema_:ViewSchema;

    /**
     * Constructor.
     */
    constructor() {
      this.fieldNameToAttributeMetadata_ = {};
      this.formData_ = {};
      this.strings_ = new Strings();
      this.validationService_ = new ValidationService(this.strings_);
    }

    /**
     * This form (and all child input elements) is disabled.
     */
    public get disabled():boolean { return this.disabled_; }
    public set disabled(value:boolean) {
      this.disabled_ = value;

      Object.keys(this.fieldNameToAttributeMetadata_).forEach(
        (fieldName:string) => {
          var attributeMetadata:AttributeMetadata = this.fieldNameToAttributeMetadata_[fieldName];
          attributeMetadata.disabled = value;
        });
    }

    /**
     * The POJO being edited by this form.
     */
    public get formData():any { return this.formData_; }
    public set formData(value:any) { this.formData_ = value; }

    /**
     * Set the strings for this specific form.
     * See {@link Strings}.
     */
    public get strings():Strings { return this.strings_; }
    public set strings(value:Strings) {
      this.strings_ = value;
      this.validationService_.strings = value;
    }

    /**
     * On submit, if form data is valid, Form JS will call this function.
     * This function is responsible for submitting the data.
     * It should return a Promise to be resolved or rejected once the submit request completes.
     */
    public get submitFunction():(data:any) => Promise<any> { return this.submitFunction_; }
    public set submitFunction(value:(data:any) => Promise<any>) { this.submitFunction_ = value; }

    /**
     * This form's validations schema.
     */
    public get validationSchema():ValidationSchema { return this.validationSchema_; }
    public set validationSchema(value:ValidationSchema) { this.validationSchema_ = value; }

    /**
     * Returns a ValidationService configured for the current Form.
     */
    get validationService():ValidationService { return this.validationService_; }

    /**
     * Optional view schema for auto-created forms.
     */
    public get viewSchema():ViewSchema { return this.viewSchema_; }
    public set viewSchema(value:ViewSchema) { this.viewSchema_ = value; }

    /**
     * Register a field with the form.
     *
     * <p>All registered form-fields must be valid before the form will enable submission.
     *
     * <p>Note that collections must also be registered explicitly (along with any nested properties).
     * For example, consider the following form data:
     *
     * <p><code>{
     *   addresses: {
     *     required: true,
     *     min: 1,
     *     items: {
     *       street: {
     *         type: "string",
     *         required: true
     *       }
     *     }
     *   }
     * }</code>
     *
     * <p>The above data format would require registration for the following:
     *
     * <ul>
     *   <li>"addresses": Register the collection itself so that required and min-size can be validated.
     *   <li>"addresses.items.street": Register nested objects so that required and tpe can be validated.
     * </ul>
     */
    public registerAttribute(fieldName:string):AttributeMetadata {
      if (this.fieldNameToAttributeMetadata_[fieldName]) {
        throw Error(`Attribute "${fieldName}" has already been registered`);
      }

      var attributeMetadata:AttributeMetadata = new AttributeMetadata(this, fieldName);

      this.fieldNameToAttributeMetadata_[fieldName] = attributeMetadata;

      return attributeMetadata;
    }

    /**
     * Validates form data and invokes the <code>submitWith</code> function if valid.
     * Returns a promise to be resolved on success or rejected if either validation or submit fails.
     */
    public submitIfValid():Promise<any> {
      if (!this.submitFunction_) {
        return Promise.reject('No submit function provided');
      }

      this.disabled = true;

      return new Promise(
        (resolve:(value?:any) => void, reject:(error?:any) => void) => {
          this.validate(true).then(
            () => {
              this.submitFunction_(this.formData).then(
                () => {
                  this.disabled = false;

                  resolve();
                },
                (fieldNameToErrorMap:{[fieldName:string]:string}) => {
                  this.processFieldNameToErrorMap_(fieldNameToErrorMap, true);
                  this.disabled = false;

                  reject();
                }
              );
            },
            () => {
              this.disabled = false;
            }
          );
        });
    }

    /**
     * Unregister a form field.
     */
    public unregisterAttribute(fieldName:string):void {
      delete this.fieldNameToAttributeMetadata_[fieldName];
    }

    /**
     * Validate all registered form-fields in preparation for submission.
     *
     * <p>This method returns a Promise that will resolve if all fields are found valid or reject if any field isn't.
     * This validation process will also update all {@link AttributeMetadata}s.
     * This in turn may cause view/binding updates.
     *
     * @param showValidationErrors Show validation error messages (even for pristine fields)
     */
    public validate(showValidationErrors:boolean):Promise<any> {
      var promises:Array<Promise<any>> = [];

      Object.keys(this.fieldNameToAttributeMetadata_).forEach(
        (fieldName:string) => {
          var attributeMetadata:AttributeMetadata = this.fieldNameToAttributeMetadata_[fieldName];

          promises.push(attributeMetadata.validate());
        });

      var promise:Promise<any> = Promise.all(<any> promises);
      promise.then(
        () => {},
        (fieldNameToErrorMap:{[fieldName:string]:string}) => {
          this.processFieldNameToErrorMap_(fieldNameToErrorMap, showValidationErrors);
        }
      );

      return promise;
    }

    private processFieldNameToErrorMap_(fieldNameToErrorMap:{[fieldName:string]:string}, unsetPristine:boolean) {
      if (typeof fieldNameToErrorMap === "object") {
        var fieldNames:Array<string> = Flatten.flatten(fieldNameToErrorMap);

        for (var index = 0, length = fieldNames.length; index < length; index++) {
          var fieldName = fieldNames[index];
          var attributeMetadata:AttributeMetadata = this.fieldNameToAttributeMetadata_[fieldName];
          var errorMessageOrArray:any = fieldNameToErrorMap[fieldName];

          if (attributeMetadata) {
            if (Array.isArray(errorMessageOrArray)) {
              attributeMetadata.errorMessages = errorMessageOrArray;
            } else if (typeof errorMessageOrArray == "string") {
              attributeMetadata.errorMessages = [errorMessageOrArray];
            }

            if (unsetPristine) {
              attributeMetadata.pristine = false;
            }
          }
        }
      }
    }
  }
}

// TODO Map nested items (e.g. addresses[0].street) to validation rules (e.g. addresses.items.street).