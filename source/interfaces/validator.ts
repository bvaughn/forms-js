/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export interface Validator {

    validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>>;
  }
}