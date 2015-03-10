/**
 * The set of supports validation constraints that can be specified for an attribute.
 */
interface ValidationConstraints {

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
   * Optional attribute type; can be either a primitive (e.g. "boolean", "string") or an object (e.g. Date, Array).
   *
   * <p>Primitives are evaluated using the <code>typeof</code> operator.
   * Objects are evaluated using <code>instanceof</code>
   */
  type?:string|any;

  /**
   * Set of custom validator functions; see {@link ValidatorFunction}.
   */
  validators?:Array<ValidatorFunction>;
}