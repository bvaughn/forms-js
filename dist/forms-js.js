(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.formsjs = factory();
  }
}(this, function() {
/// <reference path="../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    /**
     * Metadata for a single form attribute (e.g. username).
     *
     * <p>This is the facade that sits between individual inputs/fields and the Forms JS {@link Form}.
     * It handles validation (using {@link ValidationService}) and caches the result for easy access by the view layer.
     */
    var AttributeMetadata = (function () {
        /**
         * Constructor.
         *
         * @param form Forms JS form
         * @param fieldName Attribute key within form data object
         */
        function AttributeMetadata(form, fieldName) {
            this.fieldName_ = fieldName;
            this.form_ = form;
            this.disabled_ = false;
            this.errorMessages_ = [];
            this.pristine_ = true;
            this.uuid_ = formsjs.UID.create();
        }
        Object.defineProperty(AttributeMetadata.prototype, "disabled", {
            /**
             * This field's view (input) should be disabled.
             *
             * <p>This value may indicate that the form is currently being submitted.
             */
            get: function () {
                return this.disabled_;
            },
            set: function (value) {
                this.disabled_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AttributeMetadata.prototype, "errorMessages", {
            /**
             * Error messages for this field as of the time it was last validated.
             */
            get: function () {
                return this.errorMessages_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AttributeMetadata.prototype, "form", {
            /**
             * Reference to the parent Form object.
             */
            get: function () {
                return this.form_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AttributeMetadata.prototype, "pristine", {
            /**
             * Pristine fields should not display validation error messages.
             * Once a user has modified the value, the field should no longer be marked as pristine.
             * On form-submit, fields may also be marked as non-pristine.
             */
            get: function () {
                return this.pristine_;
            },
            set: function (value) {
                this.pristine_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AttributeMetadata.prototype, "required", {
            /**
             * This is a required field.
             *
             * @private
             * A note about why we treat 'required' differently even though is just another validation constraint:
             * It's a common request for forms to display a 'required' marker (in the HTML) for required fields.
             */
            get: function () {
                var validatableAttribute = this.form_.validationSchema[this.fieldName_];
                return validatableAttribute && validatableAttribute.required;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Reset metadata to its initial, pristine state.
         */
        AttributeMetadata.prototype.reset = function () {
            this.errorMessages_ = [];
            this.pristine_ = true;
        };
        /**
         * Validate (or re-validate) this field.
         *
         * <p>This method will also update the cached validation state once validation has completed.
         *
         * @return Promise to be resolved or rejected upon validation completion.
         */
        AttributeMetadata.prototype.validate = function () {
            var _this = this;
            var promise = this.form_.validationService.validateField(this.fieldName_, this.form_.formData, this.form_.validationSchema);
            promise.then(function () {
                _this.errorMessages_ = [];
            }, function (errorMessages) {
                _this.errorMessages_ = errorMessages;
            });
            return promise;
        };
        return AttributeMetadata;
    })();
    formsjs.AttributeMetadata = AttributeMetadata;
})(formsjs || (formsjs = {}));
var formsjs;
(function (formsjs) {
    /**
     * A collection of validatable data.
     *
     * <p>Despite its name, this is not an HTMLFormElement nor does it directly interact with one.
     * This object is responsible for tracking fields/inputs and ensuring their validity before allowing a submit action.
     */
    var Form = (function () {
        /**
         * Constructor.
         */
        function Form() {
            this.fieldNameToAttributeMetadata_ = {};
            this.formData_ = {};
            this.strings_ = new formsjs.Strings();
            this.validationService_ = new formsjs.ValidationService(this.strings_);
        }
        Object.defineProperty(Form.prototype, "disabled", {
            /**
             * This form (and all child input elements) is disabled.
             */
            get: function () {
                return this.disabled_;
            },
            set: function (value) {
                var _this = this;
                this.disabled_ = value;
                Object.keys(this.fieldNameToAttributeMetadata_).forEach(function (fieldName) {
                    var attributeMetadata = _this.fieldNameToAttributeMetadata_[fieldName];
                    attributeMetadata.disabled = value;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "formData", {
            /**
             * The POJO being edited by this form.
             */
            get: function () {
                return this.formData_;
            },
            set: function (value) {
                this.formData_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "strings", {
            /**
             * Set the strings for this specific form.
             * See {@link Strings}.
             */
            get: function () {
                return this.strings_;
            },
            set: function (value) {
                this.strings_ = value;
                this.validationService_.strings = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "submitFunction", {
            /**
             * On submit, if form data is valid, Form JS will call this function.
             * This function is responsible for submitting the data.
             * It should return a Promise to be resolved or rejected once the submit request completes.
             */
            get: function () {
                return this.submitFunction_;
            },
            set: function (value) {
                this.submitFunction_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "validationSchema", {
            /**
             * This form's validations schema.
             */
            get: function () {
                return this.validationSchema_;
            },
            set: function (value) {
                this.validationSchema_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "validationService", {
            /**
             * Returns a ValidationService configured for the current Form.
             */
            get: function () {
                return this.validationService_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "viewSchema", {
            /**
             * Optional view schema for auto-created forms.
             */
            get: function () {
                return this.viewSchema_;
            },
            set: function (value) {
                this.viewSchema_ = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Register a field with the form.
         *
         * <p>All registered form-fields must be valid before the form will enable submission.
         */
        Form.prototype.registerAttribute = function (fieldName) {
            if (this.fieldNameToAttributeMetadata_[fieldName]) {
                throw Error("Attribute \"" + fieldName + "\" has already been registered");
            }
            var attributeMetadata = new formsjs.AttributeMetadata(this, fieldName);
            this.fieldNameToAttributeMetadata_[fieldName] = attributeMetadata;
            return attributeMetadata;
        };
        /**
         * Validates form data and invokes the <code>submitWith</code> function if valid.
         * Returns a promise to be resolved on success or rejected if either validation or submit fails.
         */
        Form.prototype.submitIfValid = function () {
            var _this = this;
            if (!this.submitFunction_) {
                return Promise.reject('No submit function provided');
            }
            this.disabled = true;
            return new Promise(function (resolve, reject) {
                _this.validate(true).then(function () {
                    _this.submitFunction_(_this.formData).then(function () {
                        _this.disabled = false;
                        resolve();
                    }, function (fieldNameToErrorMap) {
                        _this.processFieldNameToErrorMap_(fieldNameToErrorMap, true);
                        _this.disabled = false;
                        reject();
                    });
                }, function () {
                    _this.disabled = false;
                });
            });
        };
        /**
         * Unregister a form field.
         */
        Form.prototype.unregisterAttribute = function (fieldName) {
            delete this.fieldNameToAttributeMetadata_[fieldName];
        };
        /**
         * Validate all registered form-fields in preparation for submission.
         *
         * <p>This method returns a Promise that will resolve if all fields are found valid or reject if any field isn't.
         * This validation process will also update all {@link AttributeMetadata}s.
         * This in turn may cause view/binding updates.
         *
         * @param showValidationErrors Show validation error messages (even for pristine fields)
         */
        Form.prototype.validate = function (showValidationErrors) {
            var _this = this;
            var promises = [];
            Object.keys(this.fieldNameToAttributeMetadata_).forEach(function (fieldName) {
                var attributeMetadata = _this.fieldNameToAttributeMetadata_[fieldName];
                promises.push(attributeMetadata.validate());
            });
            var promise = Promise.all(promises);
            promise.then(function () {
            }, function (fieldNameToErrorMap) {
                _this.processFieldNameToErrorMap_(fieldNameToErrorMap, showValidationErrors);
            });
            return promise;
        };
        Form.prototype.processFieldNameToErrorMap_ = function (fieldNameToErrorMap, unsetPristine) {
            if (typeof fieldNameToErrorMap === "object") {
                var fieldNames = formsjs.Flatten.flatten(fieldNameToErrorMap);
                for (var index = 0, length = fieldNames.length; index < length; index++) {
                    var fieldName = fieldNames[index];
                    var attributeMetadata = this.fieldNameToAttributeMetadata_[fieldName];
                    var errorMessageOrArray = fieldNameToErrorMap[fieldName];
                    if (attributeMetadata) {
                        if (Array.isArray(errorMessageOrArray)) {
                            attributeMetadata.errorMessages = errorMessageOrArray;
                        }
                        else if (typeof errorMessageOrArray == "string") {
                            attributeMetadata.errorMessages = [errorMessageOrArray];
                        }
                        if (unsetPristine) {
                            attributeMetadata.pristine = false;
                        }
                    }
                }
            }
        };
        return Form;
    })();
    formsjs.Form = Form;
})(formsjs || (formsjs = {}));
var formsjs;
(function (formsjs) {
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
    var Strings = (function () {
        function Strings() {
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
        Object.defineProperty(Strings.prototype, "booleanTypeValidationFailed", {
            get: function () {
                return this.booleanTypeValidationFailed_;
            },
            set: function (value) {
                this.booleanTypeValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "customValidationFailed", {
            get: function () {
                return this.customValidationFailed_;
            },
            set: function (value) {
                this.customValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "enumerationValidationFailed", {
            get: function () {
                return this.enumerationValidationFailed_;
            },
            set: function (value) {
                this.enumerationValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "floatTypeValidationFailed", {
            get: function () {
                return this.floatTypeValidationFailed_;
            },
            set: function (value) {
                this.floatTypeValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "integerTypeValidationFailed", {
            get: function () {
                return this.integerTypeValidationFailed_;
            },
            set: function (value) {
                this.integerTypeValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "maximumNumberValidationFailed", {
            get: function () {
                return this.maximumNumberValidationFailed_;
            },
            set: function (value) {
                this.maximumNumberValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "maxStringLengthValidationFailed", {
            get: function () {
                return this.maxStringLengthValidationFailed_;
            },
            set: function (value) {
                this.maxStringLengthValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "minimumNumberValidationFailed", {
            get: function () {
                return this.minimumNumberValidationFailed_;
            },
            set: function (value) {
                this.minimumNumberValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "minStringLengthValidationFailed", {
            get: function () {
                return this.minStringLengthValidationFailed_;
            },
            set: function (value) {
                this.minStringLengthValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "patternValidationFailed", {
            get: function () {
                return this.patternValidationFailed_;
            },
            set: function (value) {
                this.patternValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "requiredValidationFailed", {
            get: function () {
                return this.requiredValidationFailed_;
            },
            set: function (value) {
                this.requiredValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Strings.prototype, "stringTypeValidationFailed", {
            get: function () {
                return this.stringTypeValidationFailed_;
            },
            set: function (value) {
                this.stringTypeValidationFailed_ = value;
            },
            enumerable: true,
            configurable: true
        });
        Strings.booleanTypeValidationFailed = '${value} must be a boolean.';
        Strings.customValidationFailed = 'Value ${value} failed custom validation.';
        Strings.enumerationValidationFailed = 'The value for ${value} is not in the list of allowed values';
        Strings.floatTypeValidationFailed = '${value} must be a float.';
        Strings.integerTypeValidationFailed = '${value} must be an integer.';
        Strings.maximumNumberValidationFailed = 'Must be no more than ${max}.';
        Strings.maxStringLengthValidationFailed = 'Must be no more than ${max} characters long.';
        Strings.minimumNumberValidationFailed = 'Must be at least ${min}.';
        Strings.minStringLengthValidationFailed = 'Must be at least ${min} characters long.';
        Strings.patternValidationFailed = 'The value for ${value} does not match the required pattern';
        Strings.requiredValidationFailed = 'This is a required field.';
        Strings.stringTypeValidationFailed = '${value} must be a string.';
        return Strings;
    })();
    formsjs.Strings = Strings;
})(formsjs || (formsjs = {}));
var formsjs;
(function (formsjs) {
    /**
     * Input types available for auto-created forms; see {@link FieldView}.
     */
    (function (InputType) {
        InputType[InputType["CHECKBOX"] = "checkbox"] = "CHECKBOX";
        InputType[InputType["RADIO"] = "radio"] = "RADIO";
        InputType[InputType["TEXT"] = "text"] = "TEXT";
    })(formsjs.InputType || (formsjs.InputType = {}));
    var InputType = formsjs.InputType;
})(formsjs || (formsjs = {}));
var formsjs;
(function (formsjs) {
    /**
     * Supported type validations.
     */
    (function (ValidationType) {
        ValidationType[ValidationType["BOOLEAN"] = "boolean"] = "BOOLEAN";
        ValidationType[ValidationType["FLOAT"] = "float"] = "FLOAT";
        ValidationType[ValidationType["INTEGER"] = "integer"] = "INTEGER";
        ValidationType[ValidationType["STRING"] = "string"] = "STRING";
    })(formsjs.ValidationType || (formsjs.ValidationType = {}));
    var ValidationType = formsjs.ValidationType;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var ValidationPromiseBuilder = (function () {
        function ValidationPromiseBuilder(promises) {
            this.promises_ = promises || [];
            this.failureMessages_ = [];
        }
        /**
         * Adds validation Promises to the watched collection.
         *
         * @param promises Set of validation promise to observe
         * @returns A reference to the current ValidationPromiseBuilder
         */
        ValidationPromiseBuilder.prototype.add = function (promises) {
            var _this = this;
            promises.forEach(function (promise) {
                _this.promises_.push(promise);
                promise.then(function () {
                    _this.markCompleted_(promise);
                    _this.checkForCompletion_();
                }, function (error) {
                    _this.failureMessages_.push(error);
                    _this.markCompleted_(promise);
                    _this.checkForCompletion_();
                });
            });
            return this;
        };
        /**
         * Creates a Promise to be resolved or rejected once all watched validation Promises complete.
         */
        ValidationPromiseBuilder.prototype.build = function () {
            var _this = this;
            this.promise_ = new Promise(function (resolve, reject) {
                _this.promiseResolver_ = resolve;
                _this.promiseRejecter_ = reject;
            });
            this.checkForCompletion_();
            return this.promise_;
        };
        ValidationPromiseBuilder.prototype.checkForCompletion_ = function () {
            if (this.promise_ && this.promises_.length === 0) {
                if (this.failureMessages_.length > 0) {
                    this.promiseRejecter_(this.failureMessages_);
                }
                else {
                    this.promiseResolver_();
                }
            }
        };
        ValidationPromiseBuilder.prototype.markCompleted_ = function (promise) {
            this.promises_.splice(this.promises_.indexOf(promise), 1);
        };
        return ValidationPromiseBuilder;
    })();
    formsjs.ValidationPromiseBuilder = ValidationPromiseBuilder;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var ValidationService = (function () {
        /**
         * Constructor.
         */
        function ValidationService(strings) {
            this.strings_ = strings || new formsjs.Strings();
        }
        Object.defineProperty(ValidationService.prototype, "strings", {
            /**
             * Default validation failure messages.
             */
            get: function () {
                return this.strings_;
            },
            set: function (value) {
                this.strings_ = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Validates an individual attribute (specified by fieldName) according to the provided validation rules.
         *
         * @param fieldName Name of attribute in formData object
         * @param formData Form data
         * @param validationSchema See {@link ValidationSchema}
         * @returns Promise that resolves/rejects based on validation outcome.
         */
        ValidationService.prototype.validateField = function (fieldName, formData, validationSchema) {
            var value = formsjs.Flatten.read(fieldName, formData);
            var validatableAttribute = formsjs.Flatten.read(fieldName, validationSchema);
            var promise = new formsjs.ValidationPromiseBuilder().add(new formsjs.RequiredValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.TypeValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.MinMaxValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.EnumValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.PatternValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.CustomValidator(this.strings).validate(value, formData, validatableAttribute)).build();
            return promise;
        };
        return ValidationService;
    })();
    formsjs.ValidationService = ValidationService;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var Flatten = (function () {
        function Flatten() {
        }
        /**
         * Return a (1-dimensional) array of keys representing an object.
         *
         * <p>For example, <code>{foo: {bar: 'baz'}}</code> will become flattened into <code>'['foo', 'foo.bar']</code>.
         *
         * <p>Arrays can also be flattened.
         * Their flattened keys will take the form of 'myArray[0]' and 'myArray[0].myNestedProperty'.
         */
        Flatten.flatten = function (object) {
            var keys = [];
            var queue = [{
                object: object,
                prefix: null
            }];
            while (true) {
                if (queue.length === 0) {
                    break;
                }
                var data = queue.pop();
                var objectIsArray = Array.isArray(data.object);
                var prefix = data.prefix ? data.prefix + (objectIsArray ? '[' : '.') : '';
                var suffix = objectIsArray ? ']' : '';
                if (typeof data.object === 'object') {
                    for (var prop in data.object) {
                        var path = prefix + prop + suffix;
                        var value = data.object[prop];
                        keys.push(path);
                        queue.push({
                            object: value,
                            prefix: path
                        });
                    }
                }
            }
            return keys;
        };
        /**
         * Returns the property value of the flattened key or undefined if the property does not exist.
         *
         * <p>For example, the key 'foo.bar' would return "baz" for the object <code>{foo: {bar: "baz"}}</code>.
         * The key 'foo[1].baz' would return 2 for the object <code>{foo: [{bar: 1}, {baz: 2}]}</code>.
         */
        Flatten.read = function (flattenedKey, object) {
            var keys = flattenedKey.split(/[\.\[\]]/);
            while (keys.length > 0) {
                var key = keys.shift();
                // Keys after array will be empty
                if (!key) {
                    continue;
                }
                // Convert array indices from strings ('0') to integers (0)
                if (key.match(/^[0-9]+$/)) {
                    key = parseInt(key);
                }
                // Short-circuit if the path being read doesn't exist
                if (!object.hasOwnProperty(key)) {
                    return undefined;
                }
                object = object[key];
            }
            return object;
        };
        /**
         * Writes a value to the location specified by a flattened key and creates nested structure along the way as needed.
         *
         * <p>For example, writing "baz" to the key 'foo.bar' would result in an object <code>{foo: {bar: "baz"}}</code>.
         * Writing 3 to the key 'foo[0].bar' would result in an object <code>{foo: [{bar: 3}]}</code>.
         */
        Flatten.write = function (value, flattenedKey, object) {
            var currentKey;
            var keyIndexStart = 0;
            for (var charIndex = 0, length = flattenedKey.length; charIndex < length; charIndex++) {
                var character = flattenedKey.charAt(charIndex);
                switch (character) {
                    case '[':
                        currentKey = flattenedKey.substring(keyIndexStart, charIndex);
                        this.createPropertyIfMissing_(currentKey, object, Array);
                        break;
                    case ']':
                        currentKey = flattenedKey.substring(keyIndexStart, charIndex);
                        currentKey = parseInt(currentKey); // Convert index from string to int
                        // Special case where we're targeting this object in the array
                        if (charIndex === length - 1) {
                            object[currentKey] = value;
                        }
                        else {
                            // If this is the first time we're accessing this Array key we may need to initialize it.
                            if (!object[currentKey] && charIndex < length - 1) {
                                switch (flattenedKey.charAt(charIndex + 1)) {
                                    case '[':
                                        object[currentKey] = [];
                                        break;
                                    case '.':
                                        object[currentKey] = {};
                                        break;
                                }
                            }
                            object = object[currentKey];
                        }
                        break;
                    case '.':
                        currentKey = flattenedKey.substring(keyIndexStart, charIndex);
                        // Don't do anything with empty keys that follow Array indices (e.g. anArray[0].aProp)
                        if (currentKey) {
                            this.createPropertyIfMissing_(currentKey, object, Object);
                        }
                        break;
                    default:
                        continue;
                        break;
                }
                keyIndexStart = charIndex + 1;
                if (currentKey) {
                    object = object[currentKey];
                }
            }
            if (keyIndexStart < flattenedKey.length) {
                currentKey = flattenedKey.substring(keyIndexStart, flattenedKey.length);
                object[currentKey] = value;
            }
        };
        /**
         * Helper method for initializing a missing property.
         *
         * @throws Error if unrecognized property specified
         * @throws Error if property already exists of an incorrect type
         */
        Flatten.createPropertyIfMissing_ = function (key, object, propertyType) {
            switch (propertyType) {
                case Array:
                    if (!object.hasOwnProperty(key)) {
                        object[key] = [];
                    }
                    else if (!(object[key] instanceof Array)) {
                        throw Error('Property already exists but is not an Array');
                    }
                    break;
                case Object:
                    if (!object.hasOwnProperty(key)) {
                        object[key] = {};
                    }
                    else if (typeof object[key] !== 'object') {
                        throw Error('Property already exists but is not an Object');
                    }
                    break;
                default:
                    throw Error('Unsupported property type');
                    break;
            }
        };
        return Flatten;
    })();
    formsjs.Flatten = Flatten;
})(formsjs || (formsjs = {}));
var formsjs;
(function (formsjs) {
    /**
     * Strings utility.
     */
    var Humanizer = (function () {
        function Humanizer() {
        }
        /**
         * Converts text from snake or camel case (e.g. myVariable, my_variable) to a "humanized" case (e.g. My Variable).
         *
         * @param text Snake-case or camel-case string
         * @returns Humanized string (ex. 'My Variable')
         */
        Humanizer.humanize = function (text) {
            if (!text) {
                return '';
            }
            text = text.replace(/[A-Z]/g, function (match) {
                return ' ' + match;
            });
            text = text.replace(/_([a-z])/g, function (match, $1) {
                return ' ' + $1.toUpperCase();
            });
            text = text.replace(/\s+/g, ' ');
            text = text.trim();
            text = text.charAt(0).toUpperCase() + text.slice(1);
            return text;
        };
        return Humanizer;
    })();
    formsjs.Humanizer = Humanizer;
})(formsjs || (formsjs = {}));
var formsjs;
(function (formsjs) {
    /**
     * UID generator for formFor input fields.
     * @see http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
     */
    var UID = (function () {
        function UID() {
        }
        /**
         * Create a new UID.
         */
        UID.create = function () {
            return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
        };
        return UID;
    })();
    formsjs.UID = UID;
})(formsjs || (formsjs = {}));
/// <reference path="../../../definitions/es6-promise.d.ts" />
/// <reference path="../../../definitions/es6-promise.d.ts" />
/// <reference path="../../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var AbstractValidator = (function () {
        function AbstractValidator(strings) {
            this.strings_ = strings || new formsjs.Strings();
        }
        Object.defineProperty(AbstractValidator.prototype, "strings", {
            get: function () {
                return this.strings_;
            },
            set: function (value) {
                this.strings_ = value;
            },
            enumerable: true,
            configurable: true
        });
        AbstractValidator.prototype.validate = function (value, formData, validatableAttribute) {
            throw Error('Abstract validate method must be overridden.');
        };
        return AbstractValidator;
    })();
    formsjs.AbstractValidator = AbstractValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../../definitions/es6-promise.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var formsjs;
(function (formsjs) {
    var CustomValidator = (function (_super) {
        __extends(CustomValidator, _super);
        function CustomValidator() {
            _super.apply(this, arguments);
        }
        /**
         * @inheritDoc
         * @override
         */
        CustomValidator.prototype.validate = function (value, formData, validatableAttribute) {
            var _this = this;
            var promises = [];
            if (validatableAttribute.validators) {
                validatableAttribute.validators.forEach(function (validatorFunction) {
                    var resolution = validatorFunction(value, formData);
                    // Custom validators can return 3 types of data: a Promise, a string, or a truthy/falsy value.
                    // If a Promise is returned we must decorate it in order to ensure a reasonable failure message.
                    // Else if a (non-empty) string is returned we should consider it a failed validation.
                    // Lastly if a falsy value is returned we should consider it a failed validation as well.
                    // All of the above cases should be wrapped in a Promise to be consistent with the validator interface.
                    if (resolution instanceof Promise) {
                        promises.push(new Promise(function (resolve, reject) {
                            resolution.then(function () {
                                resolve();
                            }, function (error) {
                                var failureMessage = error || _this.strings.customValidationFailed;
                                failureMessage = failureMessage.replace('${value}', value);
                                reject(failureMessage);
                            });
                        }));
                    }
                    else if (typeof resolution === 'string' && resolution) {
                        promises.push(Promise.reject(resolution));
                    }
                    else if (!resolution) {
                        promises.push(Promise.reject(_this.strings.customValidationFailed.replace('${value}', value)));
                    }
                });
            }
            return promises;
        };
        return CustomValidator;
    })(formsjs.AbstractValidator);
    formsjs.CustomValidator = CustomValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var EnumValidator = (function (_super) {
        __extends(EnumValidator, _super);
        function EnumValidator() {
            _super.apply(this, arguments);
        }
        /**
         * @inheritDoc
         * @override
         */
        EnumValidator.prototype.validate = function (value, formData, validatableAttribute) {
            var promises = [];
            if (validatableAttribute.enumeration && validatableAttribute.enumeration.indexOf(value) < 0) {
                var failureMessage = validatableAttribute.enumerationFailureMessage || this.strings.enumerationValidationFailed;
                failureMessage = failureMessage.replace('${value}', value);
                promises.push(Promise.reject(failureMessage));
            }
            return promises;
        };
        return EnumValidator;
    })(formsjs.AbstractValidator);
    formsjs.EnumValidator = EnumValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var MinMaxValidator = (function (_super) {
        __extends(MinMaxValidator, _super);
        function MinMaxValidator() {
            _super.apply(this, arguments);
        }
        /**
         * @inheritDoc
         * @override
         */
        MinMaxValidator.prototype.validate = function (value, formData, validatableAttribute) {
            var promises = [];
            var failureMessage;
            if (validatableAttribute.min) {
                if (typeof value === 'string' && value.length < validatableAttribute.min) {
                    failureMessage = validatableAttribute.minFailureMessage || this.strings.minStringLengthValidationFailed;
                }
                else if (typeof value === 'number' && value < validatableAttribute.min) {
                    failureMessage = validatableAttribute.minFailureMessage || this.strings.minimumNumberValidationFailed;
                }
                else {
                    failureMessage = null;
                }
                if (failureMessage) {
                    failureMessage = failureMessage.replace('${value}', value).replace('${min}', validatableAttribute.min);
                    promises.push(Promise.reject(failureMessage));
                }
            }
            if (validatableAttribute.max) {
                if (typeof value === 'string' && value.length > validatableAttribute.max) {
                    failureMessage = validatableAttribute.maxFailureMessage || this.strings.maxStringLengthValidationFailed;
                }
                else if (typeof value === 'number' && value > validatableAttribute.max) {
                    failureMessage = validatableAttribute.maxFailureMessage || this.strings.maximumNumberValidationFailed;
                }
                else {
                    failureMessage = null;
                }
                if (failureMessage) {
                    failureMessage = failureMessage.replace('${value}', value).replace('${max}', validatableAttribute.max);
                    promises.push(Promise.reject(failureMessage));
                }
            }
            return promises;
        };
        return MinMaxValidator;
    })(formsjs.AbstractValidator);
    formsjs.MinMaxValidator = MinMaxValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var PatternValidator = (function (_super) {
        __extends(PatternValidator, _super);
        function PatternValidator() {
            _super.apply(this, arguments);
        }
        /**
         * @inheritDoc
         * @override
         */
        PatternValidator.prototype.validate = function (value, formData, validatableAttribute) {
            var promises = [];
            if (validatableAttribute.pattern && !validatableAttribute.pattern.exec(value)) {
                var failureMessage = validatableAttribute.patternFailureMessage || this.strings.patternValidationFailed;
                failureMessage = failureMessage.replace('${value}', value);
                promises.push(Promise.reject(failureMessage));
            }
            return promises;
        };
        return PatternValidator;
    })(formsjs.AbstractValidator);
    formsjs.PatternValidator = PatternValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var RequiredValidator = (function (_super) {
        __extends(RequiredValidator, _super);
        function RequiredValidator() {
            _super.apply(this, arguments);
        }
        /**
         * @inheritDoc
         * @override
         */
        RequiredValidator.prototype.validate = function (value, formData, validatableAttribute) {
            var promises = [];
            if (validatableAttribute.required && !value) {
                promises.push(Promise.reject(validatableAttribute.requiredFailureMessage || this.strings.requiredValidationFailed));
            }
            return promises;
        };
        return RequiredValidator;
    })(formsjs.AbstractValidator);
    formsjs.RequiredValidator = RequiredValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var TypeValidator = (function (_super) {
        __extends(TypeValidator, _super);
        function TypeValidator() {
            _super.apply(this, arguments);
        }
        /**
         * @inheritDoc
         * @override
         */
        TypeValidator.prototype.validate = function (value, formData, validatableAttribute) {
            var promises = [];
            if (validatableAttribute.type) {
                var stringValue = value !== undefined && value !== null ? value.toString() : undefined;
                var numericValue = Number(value);
                var failureMessage;
                switch (validatableAttribute.type) {
                    case formsjs.ValidationType.BOOLEAN:
                        if (stringValue && stringValue != 'true' && stringValue != 'false') {
                            failureMessage = validatableAttribute.typeFailureMessage || this.strings.booleanTypeValidationFailed;
                            failureMessage = failureMessage.replace('${value}', value);
                            promises.push(Promise.reject(failureMessage));
                        }
                        break;
                    case formsjs.ValidationType.FLOAT:
                        if (stringValue && isNaN(numericValue)) {
                            failureMessage = validatableAttribute.typeFailureMessage || this.strings.floatTypeValidationFailed;
                            failureMessage = failureMessage.replace('${value}', value);
                            promises.push(Promise.reject(failureMessage));
                        }
                        break;
                    case formsjs.ValidationType.INTEGER:
                        if (stringValue && (isNaN(numericValue) || numericValue % 1 !== 0)) {
                            failureMessage = validatableAttribute.typeFailureMessage || this.strings.integerTypeValidationFailed;
                            failureMessage = failureMessage.replace('${value}', value);
                            promises.push(Promise.reject(failureMessage));
                        }
                        break;
                    case formsjs.ValidationType.STRING:
                    default:
                        if (stringValue && typeof value !== 'string') {
                            failureMessage = validatableAttribute.typeFailureMessage || this.strings.stringTypeValidationFailed;
                            failureMessage = failureMessage.replace('${value}', value);
                            promises.push(Promise.reject(failureMessage));
                        }
                        break;
                }
            }
            return promises;
        };
        return TypeValidator;
    })(formsjs.AbstractValidator);
    formsjs.TypeValidator = TypeValidator;
})(formsjs || (formsjs = {}));

return formsjs;
}));
