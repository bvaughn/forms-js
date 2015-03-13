module fjs {

  /**
   * Map of field name to validation constraints; see {@link ValidatableAttribute}.
   */
  export interface ValidationSchema {
    [fieldName:string]:ValidatableAttribute;
  }
}