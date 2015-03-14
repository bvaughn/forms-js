(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.formsjs = factory();
  }
}(this, function() {
var formsjs;
(function (formsjs) {
    /**
     * Forms JS form represents a collection of validatable data.
     */
    var Form = (function () {
        /**
         * Constructor.
         */
        function Form() {
            this.strings_ = new formsjs.Strings();
        }
        /**
         * Returns a ValidationService configured for the current Form.
         */
        Form.prototype.createValidationService = function () {
            return new formsjs.ValidationService(this.strings);
        };
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
/// <reference path="../../definitions/es6-promise.d.ts" />
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
        function ValidationService(strings) {
            this.strings_ = strings || new formsjs.Strings();
        }
        Object.defineProperty(ValidationService.prototype, "strings", {
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
            // TODO Sanitize/escape incoming fieldName to avoid disallowed characters (e.g. ".", "[0]")
            // See https://github.com/bvaughn/angular-form-for/blob/type-script/source/utils/nested-object-helper.ts#L30
            var value = formData[fieldName];
            var validatableAttribute = validationSchema[fieldName];
            return new formsjs.ValidationPromiseBuilder().add(new formsjs.RequiredValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.TypeValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.MinMaxValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.EnumValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.PatternValidator(this.strings).validate(value, formData, validatableAttribute)).add(new formsjs.CustomValidator(this.strings).validate(value, formData, validatableAttribute)).build();
        };
        return ValidationService;
    })();
    formsjs.ValidationService = ValidationService;
})(formsjs || (formsjs = {}));
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
                    else if (!resolution) {
                        promises.push(Promise.reject(_this.strings.customValidationFailed));
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
