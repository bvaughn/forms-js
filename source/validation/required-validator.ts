/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class RequiredValidator {

    public static validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Promise<string> {
      if (!validatableAttribute.required || value) {
        return Promise.resolve<string>();
      }

      // TODO Retrieve default validation failure message from i18n service.
      return Promise.reject(validatableAttribute.requiredFailureMessage || 'This is a required field');
    }
  }
}