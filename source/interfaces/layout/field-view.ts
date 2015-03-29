module formsjs {

  /**
   * Describes additional view
   */
  export interface FieldView {

    /**
     * Input type used by this field; this is a required property.
     */
    inputType:InputType;

    /**
     * Identifies the field this view schema describes (e.g. "address.city").
     */
    fieldName?:string;

    /**
     * Optional help text providing additional context to users.
     */
    help?:string;

    /**
     * If this field is an array of objects, layout rules for those objects should be stored in this property.
     *
     * <p>For example, a collection of addresses may be stored within an "addresses" attribute.
     * Each address may contain a "street" property (among other things).
     * View rules for such an attribute may look like this:
     *
     * <p><code>{
     *   addresses: {
     *     items: {
     *       street: {
     *         inputType: "text",
     *         required: true
     *       }
     *     }
     *   }
     * }</code>
     */
    items?:ViewSchema;

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