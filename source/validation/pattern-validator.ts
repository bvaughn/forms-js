/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class PatternValidator {

    public static validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Promise<string> {
      if (!validatableAttribute.pattern || validatableAttribute.pattern.exec(value)) {
        return Promise.resolve<string>();
      }

      // TODO Retrieve default validation failure message from i18n service.
      var failureMessage = validatableAttribute.patternFailureMessage ||
        'The value for ${value} does not match the required pattern';
      failureMessage = failureMessage.replace('${value}', value);

      return Promise.reject(failureMessage);
    }
  }
}