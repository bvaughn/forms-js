/// <reference path="../definitions/es6-promise.d.ts" />

module formsjs {

  /**
   * Metadata for a single form attribute (e.g. username).
   *
   * <p>This is the facade that sits between individual inputs/fields and the Forms JS {@link Form}.
   * It handles validation (using {@link ValidationService}) and caches the result for easy access by the view layer.
   */
  export class AttributeMetadata {

    private disabled_:boolean;
    private errorMessages_:Array<string>;
    private fieldName_:string;
    private form_:Form;
    private pristine_:boolean;
    private uuid_:string;

    /**
     * Constructor.
     *
     * @param form Forms JS form
     * @param fieldName Attribute key within form data object
     */
    constructor(form:Form, fieldName:string) {
      this.fieldName_ = fieldName;
      this.form_ = form;

      this.disabled_ = false;
      this.errorMessages_ = [];
      this.pristine_ = true;
      this.uuid_ = UID.create();
    }

    /**
     * This field's view (input) should be disabled.
     *
     * <p>This value may indicate that the form is currently being submitted.
     */
    public get disabled():boolean { return this.disabled_; }
    public set disabled(value:boolean) { this.disabled_ = value; }

    /**
     * Error messages for this field as of the time it was last validated.
     */
    public get errorMessages():Array<string> { return this.errorMessages_; }

    /**
     * Reference to the parent Form object.
     */
    public get form():Form { return this.form_; }

    /**
     * Pristine fields should not display validation error messages.
     * Once a user has modified the value, the field should no longer be marked as pristine.
     * On form-submit, fields may also be marked as non-pristine.
     */
    public get pristine():boolean { return this.pristine_; }
    public set pristine(value:boolean) { this.pristine_ = value; }

    /**
     * This is a required field.
     *
     * @private
     * A note about why we treat 'required' differently even though is just another validation constraint:
     * It's a common request for forms to display a 'required' marker (in the HTML) for required fields.
     */
    public get required():boolean {
      var validatableAttribute:ValidatableAttribute = this.form_.validationSchema[this.fieldName_];

      return validatableAttribute && validatableAttribute.required;
    }

    /**
     * Reset metadata to its initial, pristine state.
     */
    public reset():void {
      this.errorMessages_ = [];
      this.pristine_ = true;
    }

    /**
     * Validate (or re-validate) this field.
     *
     * <p>This method will also update the cached validation state once validation has completed.
     *
     * @return Promise to be resolved or rejected upon validation completion.
     */
    public validate():Promise<any> {
      var promise:Promise<any> =
        this.form_.validationService.validateField(
          this.fieldName_,
          this.form_.formData,
          this.form_.validationSchema);

      promise.then(
        () => {
          this.errorMessages_ = [];
        },
        (errorMessages:Array<string>) => {
          this.errorMessages_ = errorMessages;
        });

      return promise;
    }
  }
}