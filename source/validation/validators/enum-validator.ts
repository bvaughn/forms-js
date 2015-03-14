/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class EnumValidator extends AbstractValidator {

    /**
     * @inheritDoc
     * @override
     */
    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];

      if (validatableAttribute.enum && validatableAttribute.enum.indexOf(value) < 0) {
        var failureMessage = validatableAttribute.enumFailureMessage || this.strings.enumValidationFailed;
        failureMessage = failureMessage.replace('${value}', value);

        promises.push(Promise.reject(failureMessage));
      }

      return promises;
    }
  }
}