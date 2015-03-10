/**
 * The set of supports validation constraints that can be specified for an attribute.
 */
interface ValidatableAttribute {

  /**
   * Validation constraints; see {@link ValidationConstraints}.
   */
  constraints?:ValidationConstraints;

  /**
   * Attribute name within form data object (e.g. "username" within <code>{username: "John Doe"}</code>).
   */
  key:string;
}