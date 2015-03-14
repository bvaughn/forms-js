module formsjs {

  /**
   * Forms JS form represents a collection of validatable data.
   */
  export class Form {

    private strings_:Strings;
    private validationSchema_:ValidationSchema;

    /**
     * Constructor.
     */
    constructor() {
      this.strings_ = new Strings();
    }

    /**
     * Returns a ValidationService configured for the current Form.
     */
    public createValidationService():ValidationService {
      return new ValidationService(this.strings);
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
  };
};