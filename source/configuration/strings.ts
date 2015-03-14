module formsjs {

  /**
   * Provides a mechanism for overriding Forms JS strings (e.g. validation failure messages).
   *
   * <ul>
   *   <li>The prototype of this class defines an initial set of strings (as static properties).
   *       (These are the Forms JS default values.)
   *   <li>Override the static properties to change defaults for all instances of Forms JS.
   *   <li>Strings instances will copy their values from the prototype's static properties.
   *       (This includes any global overrides you may have set.)
   *   <li>Override properties on a Strings instance to customize messages for a specific form.
   *   <li>Lastly, individual fields can provide overrides as always via the validation schame.
   *       (See {@link ValidatableAttribute}.
   * </ul>
   */
  export class Strings {

    public static booleanTypeValidationFailed:string = '${value} must be a boolean.';
    public static customValidationFailed:string = 'Value ${value} failed custom validation.';
    public static enumerationValidationFailed:string = 'The value for ${value} is not in the list of allowed values';
    public static floatTypeValidationFailed:string = '${value} must be a float.';
    public static integerTypeValidationFailed:string = '${value} must be an integer.';
    public static maximumNumberValidationFailed:string = 'Must be no more than ${max}.';
    public static maxStringLengthValidationFailed:string = 'Must be no more than ${max} characters long.';
    public static minimumNumberValidationFailed:string = 'Must be at least ${min}.';
    public static minStringLengthValidationFailed:string = 'Must be at least ${min} characters long.';
    public static patternValidationFailed:string = 'The value for ${value} does not match the required pattern';
    public static requiredValidationFailed:string = 'This is a required field.';
    public static stringTypeValidationFailed:string = '${value} must be a string.';

    private booleanTypeValidationFailed_:string;
    private customValidationFailed_:string;
    private enumerationValidationFailed_:string;
    private floatTypeValidationFailed_:string;
    private integerTypeValidationFailed_:string;
    private maximumNumberValidationFailed_:string;
    private maxStringLengthValidationFailed_:string;
    private minimumNumberValidationFailed_:string;
    private minStringLengthValidationFailed_:string;
    private patternValidationFailed_:string;
    private requiredValidationFailed_:string;
    private stringTypeValidationFailed_:string;

    constructor() {
      this.booleanTypeValidationFailed_ = Strings.booleanTypeValidationFailed;
      this.customValidationFailed_ = Strings.customValidationFailed;
      this.enumerationValidationFailed_ = Strings.enumerationValidationFailed;
      this.floatTypeValidationFailed_ = Strings.floatTypeValidationFailed;
      this.integerTypeValidationFailed_ = Strings.integerTypeValidationFailed;
      this.maximumNumberValidationFailed_ = Strings.maximumNumberValidationFailed;
      this.maxStringLengthValidationFailed_ = Strings.maxStringLengthValidationFailed;
      this.minimumNumberValidationFailed_ = Strings.minimumNumberValidationFailed;
      this.minStringLengthValidationFailed_ = Strings.minStringLengthValidationFailed;
      this.patternValidationFailed_ = Strings.patternValidationFailed;
      this.requiredValidationFailed_ = Strings.requiredValidationFailed;
      this.stringTypeValidationFailed_ = Strings.stringTypeValidationFailed;
    }

    get booleanTypeValidationFailed():string { return this.booleanTypeValidationFailed_; }
    set booleanTypeValidationFailed(value:string) { this.booleanTypeValidationFailed_ = value; }

    get customValidationFailed():string { return this.customValidationFailed_; }
    set customValidationFailed(value:string) { this.customValidationFailed_ = value; }

    get enumerationValidationFailed():string { return this.enumerationValidationFailed_; }
    set enumerationValidationFailed(value:string) { this.enumerationValidationFailed_ = value; }

    get floatTypeValidationFailed():string { return this.floatTypeValidationFailed_; }
    set floatTypeValidationFailed(value:string) { this.floatTypeValidationFailed_ = value; }

    get integerTypeValidationFailed():string { return this.integerTypeValidationFailed_; }
    set integerTypeValidationFailed(value:string) { this.integerTypeValidationFailed_ = value; }

    get maximumNumberValidationFailed():string { return this.maximumNumberValidationFailed_; }
    set maximumNumberValidationFailed(value:string) { this.maximumNumberValidationFailed_ = value; }

    get maxStringLengthValidationFailed():string { return this.maxStringLengthValidationFailed_; }
    set maxStringLengthValidationFailed(value:string) { this.maxStringLengthValidationFailed_ = value; }

    get minimumNumberValidationFailed():string { return this.minimumNumberValidationFailed_; }
    set minimumNumberValidationFailed(value:string) { this.minimumNumberValidationFailed_ = value; }

    get minStringLengthValidationFailed():string { return this.minStringLengthValidationFailed_; }
    set minStringLengthValidationFailed(value:string) { this.minStringLengthValidationFailed_ = value; }

    get patternValidationFailed():string { return this.patternValidationFailed_; }
    set patternValidationFailed(value:string) { this.patternValidationFailed_ = value; }

    get requiredValidationFailed():string { return this.requiredValidationFailed_; }
    set requiredValidationFailed(value:string) { this.requiredValidationFailed_ = value; }

    get stringTypeValidationFailed():string { return this.stringTypeValidationFailed_; }
    set stringTypeValidationFailed(value:string) { this.stringTypeValidationFailed_ = value; }
  }
}