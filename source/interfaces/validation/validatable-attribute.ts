module formsjs {

  /**
   * The set of supported validation constraints that can be specified for an attribute.
   */
  export interface ValidatableAttribute {

    /**
     * Optional set of acceptable values; any attributes values not within this set will be considered invalid.
     *
     * <p>Enum validations will fail with a default error message unless overridden with "enumFailureMessage".
     */
    enumeration?:Array<any>;

    /**
     * Optional custom failure message used in the event of a failed "enum" validation.
     *
     * <p>Use a <code>${value}</code> token to include the attribute's current string value,
     * (e.g. if value is "foobar" then "${value} is not allowed" becomes "foobar is not allowed").
     */
    enumerationFailureMessage?:string;

    /**
     * If this attribute is a collection of objects, nested object validation rules belong within this property.
     *
     * <p>For example, a collection of addresses may be stored within an "addresses" attribute.
     * That collection may have overall validation rules (e.g. required, min, max) and rules for individual addresses.
     * For example, let's say that at least one address is required and that each address must define a "street".
     * Such a validation rule may look lik this:
     *
     * <p><code>{
     *   address: {
     *     required: true,
     *     min: 1,
     *     items: {
     *       street: {
     *         required: true
     *       }
     *     }
     *   }
     * }</code>
     *
     * <p>This property is only supported for collection attributes (e.g. <code>type == ValidationType.ARRAY</code>).
     */
    items?:{[fieldName:string]:ValidatableAttribute};

    /**
     * Maximum length/size of attribute.
     *
     * <p>The attribute type will determine which type of comparison this constraint results in:
     * <ul>
     *   <li>array: Array must contain no more than this number of items
     *   <li>date: Date must be no later than this value
     *   <li>number: Numeric value must be <= this value
     *   <li>string: String length must be <= this value
     * </ul>
     *
     * <p>Max validations will fail with a default error message unless overridden with "maxFailureMessage".
     */
    max?:number;

    /**
     * Optional custom failure message used in the event of a failed "max" validation.
     *
     * <p>Use a <code>${value}</code> token to include the attribute's current numeric value,
     * (e.g. if value is 1.0 then "${value} is not allowed" becomes "1.0 is not allowed").
     */
    maxFailureMessage?:string;

    /**
     * Minimum length/size of attribute.
     *
     * <p>The attribute type will determine which type of comparison this constraint results in:
     * <ul>
     *   <li>array: Array must contain at least this number of items
     *   <li>date: Date must be no earlier than this value
     *   <li>number: Numeric value must be >= this value
     *   <li>string: String length must be >= this value
     * </ul>
     *
     * <p>Min validations will fail with a default error message unless overridden with "minFailureMessage".
     */
    min?:number;

    /**
     * Optional custom failure message used in the event of a failed "min" validation.
     *
     * <p>Use a <code>${value}</code> token to include the attribute's current numeric value,
     * (e.g. if value is 1.0 then "${value} is not allowed" becomes "1.0 is not allowed").
     */
    minFailureMessage?:string;

    /**
     * Regular expression pattern that string values must match.
     *
     * <p>Pattern validations will fail with a default error message unless overridden with "patternFailureMessage".
     */
    pattern?:RegExp;

    /**
     * Optional custom failure message used in the event of a failed "pattern" validation.
     *
     * <p>Use a <code>${value}</code> token to include the attribute's current string value,
     * (e.g. if value is "foobar" then "${value} is not allowed" becomes "foobar is not allowed").
     */
    patternFailureMessage?:string;

    /**
     * This attribute is required.
     *
     * <p>Required validations will fail with a default error message unless overridden with "requiredFailureMessage".
     */
    required?:boolean;

    /**
     * Optional custom failure message used in the event of a failed "required" validation.
     */
    requiredFailureMessage?:string;

    /**
     * Optional primitive attribute type.
     *
     * <p>If no value is specified this field will be treated as type "string".
     * Additional supported types include: "boolean", "integer", and "float".
     *
     * <p>Type validations will fail with a default error message unless overridden with "typeFailureMessage".
     */
    type?:ValidationType;

    /**
     * Optional custom failure message used in the event of a failed "type" validation.
     *
     * <p>Use a <code>${value}</code> token to include the attribute's current string value,
     * (e.g. if value is "foobar" then "${value} is not an allowed type" becomes "foobar is not an allowed type").
     */
    typeFailureMessage?:string;

    /**
     * Set of custom validator functions; see {@link ValidatorFunction}.
     */
    validators?:Array<ValidatorFunction>;
  }
}
