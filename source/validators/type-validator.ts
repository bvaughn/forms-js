module fjs {

  export class TypeValidator {

    public static validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Promise<any> {
      if (validatableAttribute.type) {
        var stringValue:string = value.toString();
        var numericValue:number = Number(value);

        // TODO Retrieve default validation failure message from i18n service.
        var failureMessage = validatableAttribute.typeFailureMessage || 'This is a required field';

        switch (validatableAttribute.type) {
          case ValidationType.BOOLEAN:
            if (stringValue != 'true' && stringValue != 'false') {
              return Promise.reject(failureMessage);
            }
            break;
          case ValidationType.FLOAT:
            if (stringValue && isNaN(numericValue)) {
              return Promise.reject(failureMessage);
            }
            break;
          case ValidationType.INTEGER:
            if (stringValue && (isNaN(numericValue) || numericValue % 1 !== 0)) {
              return Promise.reject(failureMessage);
            }
            break;
          case ValidationType.STRING:
          default:
            // No-op
            break;
        }
      }

      return Promise.resolve();
    }
  }
}