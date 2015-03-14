/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class CustomValidator {

    public static validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];

      if (validatableAttribute.validators) {
        // TODO Retrieve default validation failure message from i18n service.
        var defaultFailureMessage:string = 'Value ${value} failed custom validation.';

        validatableAttribute.validators.forEach(
          (validatorFunction:ValidatorFunction) => {
            var resolution:any = validatorFunction(value, formData);

            if (resolution instanceof Promise) {
              promises.push(resolution);
            } else if (!resolution) {
              promises.push(Promise.reject(defaultFailureMessage));
            }
          });
      }

      return promises;
    }
  }
}