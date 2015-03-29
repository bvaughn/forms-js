/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class MinMaxValidator extends AbstractValidator {

    /**
     * @inheritDoc
     * @override
     */
    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];
      var failureMessage:string;

      if (validatableAttribute.min) {
        if (validatableAttribute.type === ValidationType.ARRAY && !!value && value.length < validatableAttribute.min) {
          failureMessage = validatableAttribute.minFailureMessage || this.strings.minArrayLengthValidationFailed;
        } else if (typeof value === 'string' && value.length < validatableAttribute.min) {
          failureMessage = validatableAttribute.minFailureMessage || this.strings.minStringLengthValidationFailed;
        } else if (typeof value === 'number' && value < validatableAttribute.min) {
          failureMessage = validatableAttribute.minFailureMessage || this.strings.minimumNumberValidationFailed;
        } else {
          failureMessage = null;
        }

        if (failureMessage) {
          failureMessage = failureMessage
            .replace('${value}', value)
            .replace('${min}', <any> validatableAttribute.min);

          promises.push(Promise.reject(failureMessage));
        }
      }

      if (validatableAttribute.max) {
        if (validatableAttribute.type === ValidationType.ARRAY && !!value && value.length > validatableAttribute.max) {
          failureMessage = validatableAttribute.maxFailureMessage || this.strings.maxArrayLengthValidationFailed;
        } else if (typeof value === 'string' && value.length > validatableAttribute.max) {
          failureMessage = validatableAttribute.maxFailureMessage || this.strings.maxStringLengthValidationFailed;
        } else if (typeof value === 'number' && value > validatableAttribute.max) {
          failureMessage = validatableAttribute.maxFailureMessage || this.strings.maximumNumberValidationFailed;
        } else {
          failureMessage = null;
        }

        if (failureMessage) {
          failureMessage = failureMessage
            .replace('${value}', value)
            .replace('${max}', <any> validatableAttribute.max);

          promises.push(Promise.reject(failureMessage));
        }
      }

      return promises;
    }
  }
}