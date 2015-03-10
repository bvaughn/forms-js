/**
 * Allows custom error messages to be returned for failed RegExp validations (e.g. pattern).
 */
interface RegExpConstraint {

  /**
   * Error message used in the event of a failed validation.
   *
   * <p>If this string contains a "%s" it will be replaced with the attribute's current string value.
   */
  failureMessage:string;

  /**
   * Regular expression constraint.
   */
  value:RegExp;
}