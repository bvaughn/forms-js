/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class RequiredValidator extends AbstractValidator {

    /**
     * @inheritDoc
     * @override
     */
    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];

      if (validatableAttribute.required && !value) {
        promises.push(
          Promise.reject(validatableAttribute.requiredFailureMessage || this.strings.requiredValidationFailed));
      }

      return promises;
    }
  }
}