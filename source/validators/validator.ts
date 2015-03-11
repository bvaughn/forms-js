module fjs {

  export class Validator {

    /**
     * Validates an individual attribute (specified by fieldName) according to the provided validation rules.
     *
     * @param fieldName Name of attribute in formData object
     * @param formData Form data
     * @param validationSchema See {@link ValidationSchema}
     * @returns Promise that resolves/rejects based on validation outcome.
     */
    public static validate(fieldName:string, formData:any, validationSchema:ValidationSchema):Promise<any> {
      // TODO Sanitize/escape incoming fieldName to avoid disallowed characters (e.g. ".", "[0]")
      // See https://github.com/bvaughn/angular-form-for/blob/type-script/source/utils/nested-object-helper.ts#L30

      var value:any = formData[fieldName];
      var validatableAttribute:ValidatableAttribute = validationSchema[fieldName];

      var promises:Array<Promise<string>> = [];
      promises.push(RequiredValidator.validate(value, formData, validatableAttribute));
      // TODO Additional validators here.

      // TODO We should probably roll our own Promise.all type wrapper that returns an array of validation failures;
      // Promise.all only returns the first failure message.
      return Promise.all(promises);
    }
  }
}