/**
 * Allows custom error messages to be returned for failed numeric validations (e.g. min, max).
 */
interface NumericConstraint {

  /**
   * Error message used in the event of a failed validation.
   *
   * <p>If this string contains a "%d" it will be replaced with the attribute's current numeric value.
   */
  failureMessage:string;

  /**
   * Numeric constraint.
   */
  value:number;
}