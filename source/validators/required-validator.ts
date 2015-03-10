module fjs {

  export class RequiredValidator {

    public static validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Promise<string> {
      var required:boolean|BooleanConstraint = validatableAttribute.required;

      if (!required|| !!value) {
        return Promise.resolve<string>();
      }

      var failureMessage:string;

      if (<any>required instanceof Object) {
        failureMessage = (<BooleanConstraint> validatableAttribute.required).failureMessage;
      } else {
        failureMessage = 'This is a required field'; // TODO Read from i18n service.
      }

      return Promise.reject(failureMessage);
    }
  }
}