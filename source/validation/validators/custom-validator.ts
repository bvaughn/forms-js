/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class CustomValidator extends AbstractValidator {

    /**
     * @inheritDoc
     * @override
     */
    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];

      if (validatableAttribute.validators) {
        validatableAttribute.validators.forEach(
          (validatorFunction:ValidatorFunction) => {
            var resolution:any = validatorFunction(value, formData);

            // Custom validators can return 3 types of data: a Promise, a string, or a truthy/falsy value.
            // If a Promise is returned we must decorate it in order to ensure a reasonable failure message.
            // Else if a (non-empty) string is returned we should consider it a failed validation.
            // Lastly if a falsy value is returned we should consider it a failed validation as well.
            // All of the above cases should be wrapped in a Promise to be consistent with the validator interface.
            if (resolution instanceof Promise) {
              promises.push(
                new Promise(
                  (resolve, reject) => {
                    resolution.then(
                      () => {
                        resolve();
                      },
                      (error) => {
                        var failureMessage = error || this.strings.customValidationFailed;
                        failureMessage = failureMessage.replace('${value}', value);

                        reject(failureMessage);
                      });
                  }));
            } else if (typeof resolution === 'string' && resolution) {
              promises.push(Promise.reject(resolution));
            } else if (!resolution) {
              promises.push(Promise.reject(this.strings.customValidationFailed));
            }
          });
      }

      return promises;
    }
  }
}