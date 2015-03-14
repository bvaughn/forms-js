/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class EnumValidator {

    public static validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Promise<string> {
      if (!validatableAttribute.enum || validatableAttribute.enum.indexOf(value) >= 0) {
        return Promise.resolve<string>();
      }

      // TODO Retrieve default validation failure message from i18n service.
      var failureMessage = validatableAttribute.enumFailureMessage ||
        'The value for ${value} is not in the list of allowed values';
      failureMessage = failureMessage.replace('${value}', value);

      return Promise.reject(failureMessage);
    }
  }
}