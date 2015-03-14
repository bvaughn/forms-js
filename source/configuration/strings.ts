module formsjs {

  export class Strings {

    public static booleanTypeValidationFailed:string = '${value} must be a boolean.';
    public static customValidationFailed:string = 'Value ${value} failed custom validation.';
    public static enumValidationFailed:string = 'The value for ${value} is not in the list of allowed values';
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
    private enumValidationFailed_:string;
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
      this.enumValidationFailed_ = Strings.enumValidationFailed;
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

    get enumValidationFailed():string { return this.enumValidationFailed_; }
    set enumValidationFailed(value:string) { this.enumValidationFailed_ = value; }

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
  };
};