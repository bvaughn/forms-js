/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class EnumValidator extends AbstractValidator {

    /**
     * @inheritDoc
     * @override
     */
    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];

      if (validatableAttribute.enumeration && validatableAttribute.enumeration.indexOf(value) < 0) {
        var failureMessage = validatableAttribute.enumerationFailureMessage || this.strings.enumerationValidationFailed;
        failureMessage = failureMessage.replace('${value}', value);

        promises.push(Promise.reject(failureMessage));
      }

      return promises;
    }
  }
}