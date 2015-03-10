module fjs {

  /**
   * Allows custom error messages to be returned for failed numeric validations (e.g. min, max).
   */
  export interface NumericConstraint {

    /**
     * Error message used in the event of a failed validation.
     *
     * <p>Use a <code>${value}</code> token to include the attribute's current numeric value,
     * (e.g. if value is 1.0 then "${value} is not allowed" becomes "1.0 is not allowed").
     */
    failureMessage:string;

    /**
     * Numeric constraint.
     */
    value:number;
  }
}