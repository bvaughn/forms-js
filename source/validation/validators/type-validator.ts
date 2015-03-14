/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class TypeValidator extends AbstractValidator {

    /**
     * @inheritDoc
     * @override
     */
    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      var promises:Array<Promise<string>> = [];

      if (validatableAttribute.type) {
        var stringValue:string = value !== undefined && value !== null ? value.toString() : undefined;
        var numericValue:number = Number(value);
        var failureMessage;

        switch (validatableAttribute.type) {
          case ValidationType.BOOLEAN:
            if (stringValue && stringValue != 'true' && stringValue != 'false') {
              failureMessage = validatableAttribute.typeFailureMessage || this.strings.booleanTypeValidationFailed;
              failureMessage = failureMessage.replace('${value}', value);

              promises.push(Promise.reject(failureMessage));
            }
            break;
          case ValidationType.FLOAT:
            if (stringValue && isNaN(numericValue)) {
              failureMessage = validatableAttribute.typeFailureMessage || this.strings.floatTypeValidationFailed;
              failureMessage = failureMessage.replace('${value}', value);

              promises.push(Promise.reject(failureMessage));
            }
            break;
          case ValidationType.INTEGER:
            if (stringValue && (isNaN(numericValue) || numericValue % 1 !== 0)) {
              failureMessage = validatableAttribute.typeFailureMessage || this.strings.integerTypeValidationFailed;
              failureMessage = failureMessage.replace('${value}', value);

              promises.push(Promise.reject(failureMessage));
            }
            break;
          case ValidationType.STRING:
          default:
            if (stringValue && typeof value !== 'string') {
              failureMessage = validatableAttribute.typeFailureMessage || this.strings.stringTypeValidationFailed;
              failureMessage = failureMessage.replace('${value}', value);

              promises.push(Promise.reject(failureMessage));
            }
            break;
        }
      }

      return promises;
    }
  }
}