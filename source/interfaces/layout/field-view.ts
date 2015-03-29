module formsjs {

  /**
   * Describes additional view
   */
  export interface FieldView {

    /**
     * Input type used by this field; defaults to InputType.TEXT.
     */
    inputType?:InputType;

    /**
     * Optional help text providing additional context to users.
     */
    help?:string;

    /**
     * Field <label>; defaults to humanized form of attribute name (e.g. "firstName" becomes "First Name").
     */
    label?:string;

    /**
     * Placeholder text shown when field is empty.
     */
    placeholder?:string;

    /**
     * This field should be read-only, not editable.
     */
    readOnly?:boolean;
  }
}