/**
 * Allows custom error messages to be returned for failed boolean validations (e.g. required).
 */
interface BooleanConstraint {

  /**
   * Error message used in the event of a failed validation.
   */
  failureMessage:string;

  /**
   * Boolean constraint.
   */
  value:boolean;
}