/// <reference path="../../definitions/es6-promise.d.ts" />

module fjs {

  /**
   * Custom validation function signature.
   *
   * <p>Validations functions are provided two parameters:
   * <ol>
   *   <li>The value of the field/attribute.
   *       This is often the only piece of data needed for a custom validation.
   *   <li>The form data object (all fields)
   *       This additional data may be needed when a field depends on another field (e.g. confirm password).
   * </ol>
   *
   * <p>Custom validators are responsible for returning either a truthy/falsy value OR a Promise.
   * Synchronous validations can return TRUE to indicate a valid value or FALSE to indicate an invalid value.
   * Use a Promise to perform asynchronous validation or to return a custom failure message.
   */
  export interface ValidatorFunction {
    (value:any, formData:any):boolean|Promise<string>;
  }
}