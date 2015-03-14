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

            if (resolution instanceof Promise) {
              promises.push(
                new Promise(
                  function(resolve, reject) {
                    resolution.then(
                      function() {
                        resolve();
                      },
                      function(error) {
                        var failureMessage = error || this.strings.customValidationFailed;
                        failureMessage = failureMessage.replace('${value}', value);

                        reject(failureMessage);
                      });
                  }));
            } else if (!resolution) {
              promises.push(Promise.reject(this.strings.customValidationFailed));
            }
          });
      }

      return promises;
    }
  }
}