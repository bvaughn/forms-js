/// <reference path="../definitions/es6-promise.d.ts" />
declare module formsjs {
    /**
     * Metadata for a single form attribute (e.g. username).
     *
     * <p>This is the facade that sits between individual inputs/fields and the Forms JS {@link Form}.
     * It handles validation (using {@link ValidationService}) and caches the result for easy access by the view layer.
     */
    class AttributeMetadata {
        private disabled_;
        private errorMessages_;
        private fieldName_;
        private form_;
        private pristine_;
        private uuid_;
        /**
         * Constructor.
         *
         * @param form Forms JS form
         * @param fieldName Attribute key within form data object
         */
        constructor(form: Form, fieldName: string);
        /**
         * This field's view (input) should be disabled.
         *
         * <p>This value may indicate that the form is currently being submitted.
         */
        disabled: boolean;
        /**
         * Error messages for this field as of the time it was last validated.
         */
        errorMessages: Array<string>;
        /**
         * Reference to the parent Form object.
         */
        form: Form;
        /**
         * Pristine fields should not display validation error messages.
         * Once a user has modified the value, the field should no longer be marked as pristine.
         * On form-submit, fields may also be marked as non-pristine.
         */
        pristine: boolean;
        /**
         * This is a required field.
         *
         * @private
         * A note about why we treat 'required' differently even though is just another validation constraint:
         * It's a common request for forms to display a 'required' marker (in the HTML) for required fields.
         */
        required: boolean;
        /**
         * Reset metadata to its initial, pristine state.
         */
        reset(): void;
        /**
         * Validate (or re-validate) this field.
         *
         * <p>This method will also update the cached validation state once validation has completed.
         *
         * @return Promise to be resolved or rejected upon validation completion.
         */
        validate(): Promise<any>;
    }
}
declare module formsjs {
    /**
     * A collection of validatable data.
     *
     * <p>Despite its name, this is not an HTMLFormElement nor does it directly interact with one.
     * This object is responsible for tracking fields/inputs and ensuring their validity before allowing a submit action.
     */
    class Form {
        private disabled_;
        private fieldNameToAttributeMetadata_;
        private formData_;
        private strings_;
        private submitFunction_;
        private validationSchema_;
        private validationService_;
        private viewSchema_;
        /**
         * Constructor.
         */
        constructor();
        /**
         * This form (and all child input elements) is disabled.
         */
        disabled: boolean;
        /**
         * The POJO being edited by this form.
         */
        formData: any;
        /**
         * Set the strings for this specific form.
         * See {@link Strings}.
         */
        strings: Strings;
        /**
         * On submit, if form data is valid, Form JS will call this function.
         * This function is responsible for submitting the data.
         * It should return a Promise to be resolved or rejected once the submit request completes.
         */
        submitFunction: (data: any) => Promise<any>;
        /**
         * This form's validations schema.
         */
        validationSchema: ValidationSchema;
        /**
         * Returns a ValidationService configured for the current Form.
         */
        validationService: ValidationService;
        /**
         * Optional view schema for auto-created forms.
         */
        viewSchema: ViewSchema;
        /**
         * Register a field with the form.
         *
         * <p>All registered form-fields must be valid before the form will enable submission.
         */
        registerAttribute(fieldName: string): AttributeMetadata;
        /**
         * Validates form data and invokes the <code>submitWith</code> function if valid.
         * Returns a promise to be resolved on success or rejected if either validation or submit fails.
         */
        submitIfValid(): Promise<any>;
        /**
         * Unregister a form field.
         */
        unregisterAttribute(fieldName: string): void;
        /**
         * Validate all registered form-fields in preparation for submission.
         *
         * <p>This method returns a Promise that will resolve if all fields are found valid or reject if any field isn't.
         * This validation process will also update all {@link AttributeMetadata}s.
         * This in turn may cause view/binding updates.
         *
         * @param showValidationErrors Show validation error messages (even for pristine fields)
         */
        validate(showValidationErrors: boolean): Promise<any>;
        private processFieldNameToErrorMap_(fieldNameToErrorMap, unsetPristine);
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
        static arrayTypeValidationFailed: string;
        static booleanTypeValidationFailed: string;
        static customValidationFailed: string;
        static enumerationValidationFailed: string;
        static floatTypeValidationFailed: string;
        static integerTypeValidationFailed: string;
        static maximumNumberValidationFailed: string;
        static maxArrayLengthValidationFailed: string;
        static maxStringLengthValidationFailed: string;
        static minimumNumberValidationFailed: string;
        static minArrayLengthValidationFailed: string;
        static minStringLengthValidationFailed: string;
        static patternValidationFailed: string;
        static requiredValidationFailed: string;
        static stringTypeValidationFailed: string;
        private arrayTypeValidationFailed_;
        private booleanTypeValidationFailed_;
        private customValidationFailed_;
        private enumerationValidationFailed_;
        private floatTypeValidationFailed_;
        private integerTypeValidationFailed_;
        private maximumNumberValidationFailed_;
        private maxArrayLengthValidationFailed_;
        private maxStringLengthValidationFailed_;
        private minimumNumberValidationFailed_;
        private minArrayLengthValidationFailed_;
        private minStringLengthValidationFailed_;
        private patternValidationFailed_;
        private requiredValidationFailed_;
        private stringTypeValidationFailed_;
        constructor();
        arrayTypeValidationFailed: string;
        booleanTypeValidationFailed: string;
        customValidationFailed: string;
        enumerationValidationFailed: string;
        floatTypeValidationFailed: string;
        integerTypeValidationFailed: string;
        maximumNumberValidationFailed: string;
        maxArrayLengthValidationFailed: string;
        maxStringLengthValidationFailed: string;
        minimumNumberValidationFailed: string;
        minArrayLengthValidationFailed: string;
        minStringLengthValidationFailed: string;
        patternValidationFailed: string;
        requiredValidationFailed: string;
        stringTypeValidationFailed: string;
    }
}
declare module formsjs {
    /**
     * Input types available for auto-created forms; see {@link FieldView}.
     */
    enum InputType {
        CHECKBOX,
        RADIO,
        TEXT,
    }
}
declare module formsjs {
    /**
     * Supported type validations.
     */
    enum ValidationType {
        ARRAY,
        BOOLEAN,
        FLOAT,
        INTEGER,
        STRING,
    }
}
declare module formsjs {
    class Flatten {
        /**
         * Return a (1-dimensional) array of keys representing an object.
         *
         * <p>For example, <code>{foo: {bar: 'baz'}}</code> will become flattened into <code>'['foo', 'foo.bar']</code>.
         *
         * <p>Arrays can also be flattened.
         * Their flattened keys will take the form of 'myArray[0]' and 'myArray[0].myNestedProperty'.
         */
        static flatten(object: any): Array<string>;
        /**
         * Returns the property value of the flattened key or undefined if the property does not exist.
         *
         * <p>For example, the key 'foo.bar' would return "baz" for the object <code>{foo: {bar: "baz"}}</code>.
         * The key 'foo[1].baz' would return 2 for the object <code>{foo: [{bar: 1}, {baz: 2}]}</code>.
         */
        static read(flattenedKey: string, object: any): any;
        /**
         * Writes a value to the location specified by a flattened key and creates nested structure along the way as needed.
         *
         * <p>For example, writing "baz" to the key 'foo.bar' would result in an object <code>{foo: {bar: "baz"}}</code>.
         * Writing 3 to the key 'foo[0].bar' would result in an object <code>{foo: [{bar: 3}]}</code>.
         */
        static write(value: any, flattenedKey: string, object: any): void;
        /**
         * Helper method for initializing a missing property.
         *
         * @throws Error if unrecognized property specified
         * @throws Error if property already exists of an incorrect type
         */
        private static createPropertyIfMissing_(key, object, propertyType);
    }
}
declare module formsjs {
    /**
     * Strings utility.
     */
    class Humanizer {
        /**
         * Converts text from snake or camel case (e.g. myVariable, my_variable) to a "humanized" case (e.g. My Variable).
         *
         * @param text Snake-case or camel-case string
         * @returns Humanized string (ex. 'My Variable')
         */
        static humanize(text: string): string;
    }
}
declare module formsjs {
    /**
     * UID generator for formFor input fields.
     * @see http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
     */
    class UID {
        /**
         * Create a new UID.
         */
        static create(): string;
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
        /**
         * Constructor.
         */
        constructor(strings?: Strings);
        /**
         * Default validation failure messages.
         */
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
    /**
     * Describes additional view
     */
    interface FieldView {
        /**
         * Input type used by this field; defaults to InputType.TEXT.
         */
        inputType?: InputType;
        /**
         * Optional help text providing additional context to users.
         */
        help?: string;
        /**
         * Field <label>; defaults to humanized form of attribute name (e.g. "firstName" becomes "First Name").
         */
        label?: string;
        /**
         * Placeholder text shown when field is empty.
         */
        placeholder?: string;
        /**
         * This field should be read-only, not editable.
         */
        readOnly?: boolean;
    }
}
declare module formsjs {
    /**
     * Describes the desired view layout for an auto-generated form.
     * This schema is a map of field-name to view options.
     */
    interface ViewSchema {
        [fieldName: string]: FieldView;
    }
}
declare module formsjs {
    /**
     * The set of supported validation constraints that can be specified for an attribute.
     */
    interface ValidatableAttribute {
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
         * If this attribute is a collection of objects, nested object validation rules belong within this property.
         *
         * <p>For example, a collection of addresses may be stored within an "addresses" attribute.
         * That collection may have overall validation rules (e.g. required, min, max) and rules for individual addresses.
         * For example, let's say that at least one address is required and that each address must define a "street".
         * Such a validation rule may look lik this:
         *
         * <p><code>{
         *   address: {
         *     required: true,
         *     min: 1,
         *     items: {
         *       street: {
         *         required: true
         *       }
         *     }
         *   }
         * }</code>
         *
         * <p>This property is only supported for collection attributes (e.g. <code>type == ValidationType.ARRAY</code>).
         */
        items?: {
            [fieldName: string]: ValidatableAttribute;
        };
        /**
         * Maximum length/size of attribute.
         *
         * <p>The attribute type will determine which type of comparison this constraint results in:
         * <ul>
         *   <li>array: Array must contain no more than this number of items
         *   <li>date: Date must be no later than this value
         *   <li>number: Numeric value must be <= this value
         *   <li>string: String length must be <= this value
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
         *   <li>array: Array must contain at least this number of items
         *   <li>date: Date must be no earlier than this value
         *   <li>number: Numeric value must be >= this value
         *   <li>string: String length must be >= this value
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
        patternFailureMessage?: string;
        /**
         * This attribute is required.
         *
         * <p>Required validations will fail with a default error message unless overridden with "requiredFailureMessage".
         */
        required?: boolean;
        /**
         * Optional custom failure message used in the event of a failed "required" validation.
         */
        requiredFailureMessage?: string;
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
        typeFailureMessage?: string;
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
