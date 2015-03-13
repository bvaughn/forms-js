/// <reference path="../../definitions/es6-promise.d.ts" />

module fjs {

  export class MinMaxValidator {

    public static validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Promise<any> {
      var failureMessage:string;

      // TODO Retrieve default validation failure messages from i18n service.

      if (validatableAttribute.min) {
        if (typeof value === 'string' && value.length < validatableAttribute.min) {
          failureMessage = validatableAttribute.minFailureMessage || "Must be at least ${min} characters long.";
        } else if (typeof value === 'number' && value < validatableAttribute.min) {
          failureMessage = validatableAttribute.minFailureMessage || "Must be at least ${min}.";
        }

        if (failureMessage) {
          failureMessage = failureMessage
            .replace('${value}', value)
            .replace('${min}', <any> validatableAttribute.min);

          return Promise.reject(failureMessage);
        }
      }

      if (validatableAttribute.max) {
        if (typeof value === 'string' && value.length > validatableAttribute.max) {
          failureMessage = validatableAttribute.maxFailureMessage || "Must be no more than ${max} characters long.";
        } else if (typeof value === 'number' && value > validatableAttribute.max) {
          failureMessage = validatableAttribute.maxFailureMessage || "Must be no more than ${max}.";
        }

        if (failureMessage) {
          failureMessage = failureMessage
            .replace('${value}', value)
            .replace('${max}', <any> validatableAttribute.max);

          return Promise.reject(failureMessage);
        }
      }

      return Promise.resolve();
    }
  }
}