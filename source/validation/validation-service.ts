/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class ValidationService {

    protected strings_:Strings;

    /**
     * Constructor.
     */
    constructor(strings?:Strings) {
      this.strings_ = strings || new Strings();
    }

    /**
     * Default validation failure messages.
     */
    public get strings():Strings {
      return this.strings_;
    }
    public set strings(value:Strings) {
      this.strings_ = value;
    }

    /**
     * Validates an individual attribute (specified by fieldName) according to the provided validation rules.
     *
     * @param fieldName Name of attribute in formData object
     * @param formData Form data
     * @param validationSchema See {@link ValidationSchema}
     * @returns Promise that resolves/rejects based on validation outcome.
     */
    public validateField(fieldName:string, formData:any, validationSchema:ValidationSchema):Promise<any> {
      var value:any = Flatten.read(fieldName, formData);
      var validatableAttribute:ValidatableAttribute = Flatten.read(fieldName, validationSchema);

      var promise:Promise<any>;

      if (!validatableAttribute) {
        promise = Promise.resolve();
      } else {
        promise =
          new ValidationPromiseBuilder()
            .add(new RequiredValidator(this.strings).validate(value, formData, validatableAttribute))
            .add(new TypeValidator(this.strings).validate(value, formData, validatableAttribute))
            .add(new MinMaxValidator(this.strings).validate(value, formData, validatableAttribute))
            .add(new EnumValidator(this.strings).validate(value, formData, validatableAttribute))
            .add(new PatternValidator(this.strings).validate(value, formData, validatableAttribute))
            .add(new CustomValidator(this.strings).validate(value, formData, validatableAttribute))
            .build();
      }

      return promise;

    }
  }
}