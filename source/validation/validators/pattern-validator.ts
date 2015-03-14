/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class PatternValidator extends AbstractValidator {

    /**
     * @inheritDoc
     * @override
     */
    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];

      if (validatableAttribute.pattern && !validatableAttribute.pattern.exec(value)) {
        var failureMessage = validatableAttribute.patternFailureMessage || this.strings.patternValidationFailed;
        failureMessage = failureMessage.replace('${value}', value);

        promises.push(Promise.reject(failureMessage));
      }

      return promises;
    }
  }
}