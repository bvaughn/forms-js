module formsjs {

  /**
   * Forms JS form represents a collection of validatable data.
   */
  export class Form {

    private fieldNameToAttributeMetadata_:{[fieldName:string]:AttributeMetadata};
    private formData_:any;
    private strings_:Strings;
    private validationSchema_:ValidationSchema;

    /**
     * Constructor.
     */
    constructor() {
      this.fieldNameToAttributeMetadata_ = {};
      this.formData = {};
      this.strings_ = new Strings();
    }

    /**
     * Returns a ValidationService configured for the current Form.
     */
    public createValidationService():ValidationService {
      return new ValidationService(this.strings);
    }

    /**
     * The POJO being edited by this form.
     */
    public get formData():any {
      return this.formData_;
    }

    public set formData(value:any) {
      this.formData_ = value;
    }

    /**
     * Set the strings for this specific form.
     * See {@link Strings}.
     */
    public get strings():Strings {
      return this.strings_;
    }

    public set strings(value:Strings) {
      this.strings_ = value;
    }

    /**
     * This form's validations schema.
     */
    public get validationSchema():ValidationSchema {
      return this.validationSchema_;
    }

    public set validationSchema(value:ValidationSchema) {
      this.validationSchema_ = value;
    }

    /**
     * Register a field with the form.
     *
     * <p>All registered form-fields must be valid before the form will enable submission.
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
     * Unregister a form field.
     */
    public unregisterAttribute(fieldName:string):void {
      delete this.fieldNameToAttributeMetadata_[fieldName];
    }
  }
}