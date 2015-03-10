interface FormData {

  /**
   * Map of field name to validation rules; see {@link ValidatableAttribute}.
   */
  fields:{[fieldName:string]:ValidatableAttribute};
};