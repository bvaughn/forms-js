interface ValidationSchema {

  /**
   * Map of field name to validation constraints; see {@link ValidatableAttribute}.
   */
  fields:{[fieldName:string]:ValidatableAttribute};
};