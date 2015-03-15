/// <reference path="../definitions/es6-promise.d.ts" />
declare module formsjs {
    /**
     * Forms JS form represents a collection of validatable data.
     */
    class Form {
        private strings_;
        private validationSchema_;
        /**
         * Constructor.
         */
        constructor();
        /**
         * Returns a ValidationService configured for the current Form.
         */
        createValidationService(): ValidationService;
        /**
         * Set the strings for this specific form.
         * See {@link Strings}.
         */
        strings: Strings;
        /**
         * This form's validations schema.
         */
        validationSchema: ValidationSchema;
    }
}
declare module formsjs {
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
    class Strings {
        static booleanTypeValidationFailed: string;
        static customValidationFailed: string;
        static enumerationValidationFailed: string;
        static floatTypeValidationFailed: string;
        static integerTypeValidationFailed: string;
        static maximumNumberValidationFailed: string;
        static maxStringLengthValidationFailed: string;
        static minimumNumberValidationFailed: string;
        static minStringLengthValidationFailed: string;
        static patternValidationFailed: string;
        static requiredValidationFailed: string;
        static stringTypeValidationFailed: string;
        private booleanTypeValidationFailed_;
        private customValidationFailed_;
        private enumerationValidationFailed_;
        private floatTypeValidationFailed_;
        private integerTypeValidationFailed_;
        private maximumNumberValidationFailed_;
        private maxStringLengthValidationFailed_;
        private minimumNumberValidationFailed_;
        private minStringLengthValidationFailed_;
        private patternValidationFailed_;
        private requiredValidationFailed_;
        private stringTypeValidationFailed_;
        constructor();
        booleanTypeValidationFailed: string;
        customValidationFailed: string;
        enumerationValidationFailed: string;
        floatTypeValidationFailed: string;
        integerTypeValidationFailed: string;
        maximumNumberValidationFailed: string;
        maxStringLengthValidationFailed: string;
        minimumNumberValidationFailed: string;
        minStringLengthValidationFailed: string;
        patternValidationFailed: string;
        requiredValidationFailed: string;
        stringTypeValidationFailed: string;
    }
}
declare module formsjs {
    /**
     * Supported type validations.
     */
    enum ValidationType {
        BOOLEAN,
        FLOAT,
        INTEGER,
        STRING,
    }
}
declare module formsjs {
    /**
     * The set of supported validation constraints that can be specified for an attribute.
     */
    interface ValidatableAttribute {
        /**
         * Attribute name within form data object (e.g. "username" within <code>{username: "John Doe"}</code>).
         * This is a convenience attribute added by Forms JS based on the map key in {@link ValidationSchema}.
         * @private
         */
        key_: string;
        /**
         * Optional set of acceptable values; any attributes values not within this set will be considered invalid.
         *
         * <p>Enum validations will fail with a default error message unless overridden with "enumFailureMessage".
         */
        enumeration?: Array<any>;
        /**
         * Optional custom failure message used in the event of a failed "enum" validation.
         *
         * <p>Use a <code>${value}</code> token to include the attribute's current string value,
         * (e.g. if value is "foobar" then "${value} is not allowed" becomes "foobar is not allowed").
         */
        enumerationFailureMessage?: string;
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
         * <p>Max validations will fail with a default error message unless overridden with "maxFailureMessage".
         */
        max?: number;
        /**
         * Optional custom failure message used in the event of a failed "max" validation.
         *
         * <p>Use a <code>${value}</code> token to include the attribute's current numeric value,
         * (e.g. if value is 1.0 then "${value} is not allowed" becomes "1.0 is not allowed").
         */
        maxFailureMessage?: string;
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
         * <p>Min validations will fail with a default error message unless overridden with "minFailureMessage".
         */
        min?: number;
        /**
         * Optional custom failure message used in the event of a failed "min" validation.
         *
         * <p>Use a <code>${value}</code> token to include the attribute's current numeric value,
         * (e.g. if value is 1.0 then "${value} is not allowed" becomes "1.0 is not allowed").
         */
        minFailureMessage?: string;
        /**
         * Regular expression pattern that string values must match.
         *
         * <p>Pattern validations will fail with a default error message unless overridden with "patternFailureMessage".
         */
        pattern?: RegExp;
        /**
         * Optional custom failure message used in the event of a failed "pattern" validation.
         *
         * <p>Use a <code>${value}</code> token to include the attribute's current string value,
         * (e.g. if value is "foobar" then "${value} is not allowed" becomes "foobar is not allowed").
         */
        patternFailureMessage: string;
        /**
         * This attribute is required.
         *
         * <p>Required validations will fail with a default error message unless overridden with "requiredFailureMessage".
         */
        required?: boolean;
        /**
         * Optional custom failure message used in the event of a failed "required" validation.
         */
        requiredFailureMessage: string;
        /**
         * Optional primitive attribute type.
         *
         * <p>If no value is specified this field will be treated as type "string".
         * Additional supported types include: "boolean", "integer", and "float".
         *
         * <p>Type validations will fail with a default error message unless overridden with "typeFailureMessage".
         */
        type?: ValidationType;
        /**
         * Optional custom failure message used in the event of a failed "type" validation.
         *
         * <p>Use a <code>${value}</code> token to include the attribute's current string value,
         * (e.g. if value is "foobar" then "${value} is not an allowed type" becomes "foobar is not an allowed type").
         */
        typeFailureMessage: string;
        /**
         * Set of custom validator functions; see {@link ValidatorFunction}.
         */
        validators?: Array<ValidatorFunction>;
    }
}
declare module formsjs {
    /**
     * Map of field name to validation constraints; see {@link ValidatableAttribute}.
     */
    interface ValidationSchema {
        [fieldName: string]: ValidatableAttribute;
    }
}
declare module formsjs {
    /**
     * Custom validation function signature.
     *
     * <p>Validations functions are provided two parameters:
     * <ol>
     *   <li>The value of the field/attribute.
     *       This is often the only piece of data needed for a custom validation.
     *   <li>The form data object (all fields)
     *       This additional data may be needed when a field depends on another field (e.g. confirm password).
     * </ol>
     *
     * <p>Custom validators are responsible for returning either a truthy/falsy value OR a Promise.
     * Synchronous validations can return TRUE to indicate a valid value or FALSE to indicate an invalid value.
     * Use a Promise to perform asynchronous validation or to return a custom failure message.
     */
    interface ValidatorFunction {
        (value: any, formData: any): boolean | Promise<string>;
    }
}
declare module formsjs {
    interface Validator {
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
declare module formsjs {
    class Flatten {
        static flatten(object: any): Array<string>;
    }
}
declare module formsjs {
    class ValidationPromiseBuilder {
        private failureMessages_;
        private promise_;
        private promiseRejecter_;
        private promiseResolver_;
        private promises_;
        constructor(promises?: Array<Promise<any>>);
        /**
         * Adds validation Promises to the watched collection.
         *
         * @param promises Set of validation promise to observe
         * @returns A reference to the current ValidationPromiseBuilder
         */
        add(promises: Array<Promise<any>>): ValidationPromiseBuilder;
        /**
         * Creates a Promise to be resolved or rejected once all watched validation Promises complete.
         */
        build(): Promise<any>;
        private checkForCompletion_();
        private markCompleted_(promise);
    }
}
declare module formsjs {
    class ValidationService {
        protected strings_: Strings;
        constructor(strings?: Strings);
        strings: Strings;
        /**
         * Validates an individual attribute (specified by fieldName) according to the provided validation rules.
         *
         * @param fieldName Name of attribute in formData object
         * @param formData Form data
         * @param validationSchema See {@link ValidationSchema}
         * @returns Promise that resolves/rejects based on validation outcome.
         */
        validateField(fieldName: string, formData: any, validationSchema: ValidationSchema): Promise<any>;
    }
}
declare module formsjs {
    class AbstractValidator implements Validator {
        protected strings_: Strings;
        constructor(strings?: Strings);
        strings: Strings;
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
declare module formsjs {
    class CustomValidator extends AbstractValidator {
        /**
         * @inheritDoc
         * @override
         */
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
declare module formsjs {
    class EnumValidator extends AbstractValidator {
        /**
         * @inheritDoc
         * @override
         */
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
declare module formsjs {
    class MinMaxValidator extends AbstractValidator {
        /**
         * @inheritDoc
         * @override
         */
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
declare module formsjs {
    class PatternValidator extends AbstractValidator {
        /**
         * @inheritDoc
         * @override
         */
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
declare module formsjs {
    class RequiredValidator extends AbstractValidator {
        /**
         * @inheritDoc
         * @override
         */
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
declare module formsjs {
    class TypeValidator extends AbstractValidator {
        /**
         * @inheritDoc
         * @override
         */
        validate(value: any, formData: any, validatableAttribute: ValidatableAttribute): Array<Promise<string>>;
    }
}
