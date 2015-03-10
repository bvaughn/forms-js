module fjs {

  /**
   * The set of supported validation constraints that can be specified for an attribute.
   */
  export interface ValidatableAttribute {

    /**
     * Attribute name within form data object (e.g. "username" within <code>{username: "John Doe"}</code>).
     * This is a convenience attribute added by Forms JS based on the map key in {@link ValidationSchema}.
     * @private
     */
    key_:string;

    /**
     * Optional set of acceptable values; any attributes values not within this set will be considered invalid.
     */
      enum?:Array<any>|EnumConstraint;

    /**
     * Maximum length/size of attribute.
     *
     * <p>The attribute type will determine which type of comparison this constraint results in:
     * <ul>
     *   <li>number: Numeric value must be <= this value
     *   <li>string: String length must be <= this value
     *   <li>date: Date must be no later than this value
     * </ul>
     *
     * <p>Integer values will fail with a default error message.
     * Custom error messages can be provided with a {@link NumericConstraint}.
     */
    max?:number|NumericConstraint;

    /**
     * Minimum length/size of attribute.
     *
     * <p>The attribute type will determine which type of comparison this constraint results in:
     * <ul>
     *   <li>number: Numeric value must be >= this value
     *   <li>string: String length must be >= this value
     *   <li>date: Date must be no earlier than this value
     * </ul>
     *
     * <p>Use a {@link NumericConstraint} to provide a custom message for failed validations.
     */
    min?:number|NumericConstraint;

    /**
     * Regular expression pattern that string values must match.
     *
     * <p>Use a {@link RegExpConstraint} to provide a custom message for failed validations.
     */
    pattern?:RegExp|RegExpConstraint;

    /**
     * This attribute is required.
     */
    required?:boolean|BooleanConstraint;

    /**
     * Optional primitive attribute type.
     *
     * <p>If no value is specified this field will be treated as type "string".
     * Additional supported types include: "boolean", "integer", and "float".
     */
    type?:string;

    /**
     * Set of custom validator functions; see {@link ValidatorFunction}.
     */
    validators?:Array<ValidatorFunction>;
  }
}