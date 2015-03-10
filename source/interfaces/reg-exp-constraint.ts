module fjs {

  /**
   * Allows custom error messages to be returned for failed RegExp validations (e.g. pattern).
   */
  export interface RegExpConstraint {

    /**
     * Error message used in the event of a failed validation.
     *
     * <p>Use a <code>${value}</code> token to include the attribute's current string value,
     * (e.g. if value is "foobar" then "${value} is not allowed" becomes "Foobar is not allowed").
     */
    failureMessage:string;

    /**
     * Regular expression constraint.
     */
    value:RegExp;
  }
}