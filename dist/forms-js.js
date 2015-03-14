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
     * Supported type validations.
     */
    (function (ValidationType) {
        ValidationType[ValidationType["BOOLEAN"] = "boolean"] = "BOOLEAN";
        ValidationType[ValidationType["FLOAT"] = "float"] = "FLOAT";
        ValidationType[ValidationType["INTEGER"] = "integer"] = "INTEGER";
        ValidationType[ValidationType["STRING"] = "string"] = "STRING";
    })(formsjs.ValidationType || (formsjs.ValidationType = {}));
    var ValidationType = formsjs.ValidationType;
    ;
})(formsjs || (formsjs = {}));
;
/// <reference path="../../definitions/es6-promise.d.ts" />
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var CustomValidator = (function () {
        function CustomValidator() {
        }
        CustomValidator.validate = function (value, formData, validatableAttribute) {
            var promises = [];
            if (validatableAttribute.validators) {
                // TODO Retrieve default validation failure message from i18n service.
                var defaultFailureMessage = 'Value ${value} failed custom validation.';
                validatableAttribute.validators.forEach(function (validatorFunction) {
                    var resolution = validatorFunction(value, formData);
                    if (resolution instanceof Promise) {
                        promises.push(resolution);
                    }
                    else if (!resolution) {
                        promises.push(Promise.reject(defaultFailureMessage));
                    }
                });
            }
            return promises;
        };
        return CustomValidator;
    })();
    formsjs.CustomValidator = CustomValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var EnumValidator = (function () {
        function EnumValidator() {
        }
        EnumValidator.validate = function (value, formData, validatableAttribute) {
            if (!validatableAttribute.enum || validatableAttribute.enum.indexOf(value) >= 0) {
                return Promise.resolve();
            }
            // TODO Retrieve default validation failure message from i18n service.
            var failureMessage = validatableAttribute.enumFailureMessage || 'The value for ${value} is not in the list of allowed values';
            failureMessage = failureMessage.replace('${value}', value);
            return Promise.reject(failureMessage);
        };
        return EnumValidator;
    })();
    formsjs.EnumValidator = EnumValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var MinMaxValidator = (function () {
        function MinMaxValidator() {
        }
        MinMaxValidator.validate = function (value, formData, validatableAttribute) {
            var failureMessage;
            // TODO Retrieve default validation failure messages from i18n service.
            if (validatableAttribute.min) {
                if (typeof value === 'string' && value.length < validatableAttribute.min) {
                    failureMessage = validatableAttribute.minFailureMessage || "Must be at least ${min} characters long.";
                }
                else if (typeof value === 'number' && value < validatableAttribute.min) {
                    failureMessage = validatableAttribute.minFailureMessage || "Must be at least ${min}.";
                }
                if (failureMessage) {
                    failureMessage = failureMessage.replace('${value}', value).replace('${min}', validatableAttribute.min);
                    return Promise.reject(failureMessage);
                }
            }
            if (validatableAttribute.max) {
                if (typeof value === 'string' && value.length > validatableAttribute.max) {
                    failureMessage = validatableAttribute.maxFailureMessage || "Must be no more than ${max} characters long.";
                }
                else if (typeof value === 'number' && value > validatableAttribute.max) {
                    failureMessage = validatableAttribute.maxFailureMessage || "Must be no more than ${max}.";
                }
                if (failureMessage) {
                    failureMessage = failureMessage.replace('${value}', value).replace('${max}', validatableAttribute.max);
                    return Promise.reject(failureMessage);
                }
            }
            return Promise.resolve();
        };
        return MinMaxValidator;
    })();
    formsjs.MinMaxValidator = MinMaxValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var PatternValidator = (function () {
        function PatternValidator() {
        }
        PatternValidator.validate = function (value, formData, validatableAttribute) {
            if (!validatableAttribute.pattern || validatableAttribute.pattern.exec(value)) {
                return Promise.resolve();
            }
            // TODO Retrieve default validation failure message from i18n service.
            var failureMessage = validatableAttribute.patternFailureMessage || 'The value for ${value} does not match the required pattern';
            failureMessage = failureMessage.replace('${value}', value);
            return Promise.reject(failureMessage);
        };
        return PatternValidator;
    })();
    formsjs.PatternValidator = PatternValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var RequiredValidator = (function () {
        function RequiredValidator() {
        }
        RequiredValidator.validate = function (value, formData, validatableAttribute) {
            if (!validatableAttribute.required || value) {
                return Promise.resolve();
            }
            // TODO Retrieve default validation failure message from i18n service.
            return Promise.reject(validatableAttribute.requiredFailureMessage || 'This is a required field');
        };
        return RequiredValidator;
    })();
    formsjs.RequiredValidator = RequiredValidator;
})(formsjs || (formsjs = {}));
/// <reference path="../../definitions/es6-promise.d.ts" />
var formsjs;
(function (formsjs) {
    var TypeValidator = (function () {
        function TypeValidator() {
        }
        TypeValidator.validate = function (value, formData, validatableAttribute) {
            if (validatableAttribute.type) {
                var stringValue = value !== undefined && value !== null ? value.toString() : undefined;
                var numericValue = Number(value);
                // TODO Retrieve default validation failure message from i18n service.
                var failureMessage = validatableAttribute.typeFailureMessage || '${value} is not a ${type}.';
                failureMessage = failureMessage.replace('${value}', value).replace('${type}', validatableAttribute.type);
                switch (validatableAttribute.type) {
                    case formsjs.ValidationType.BOOLEAN:
                        if (stringValue && stringValue != 'true' && stringValue != 'false') {
                            return Promise.reject(failureMessage);
                        }
                        break;
                    case formsjs.ValidationType.FLOAT:
                        if (stringValue && isNaN(numericValue)) {
                            return Promise.reject(failureMessage);
                        }
                        break;
                    case formsjs.ValidationType.INTEGER:
                        if (stringValue && (isNaN(numericValue) || numericValue % 1 !== 0)) {
                            return Promise.reject(failureMessage);
                        }
                        break;
                    case formsjs.ValidationType.STRING:
                    default:
                        break;
                }
            }
            return Promise.resolve();
        };
        return TypeValidator;
    })();
    formsjs.TypeValidator = TypeValidator;
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
         * Adds a validation Promise to the watched collection.
         *
         * @param promise Validation promise to observe
         * @returns A reference to the current ValidationPromiseBuilder
         */
        ValidationPromiseBuilder.prototype.add = function (promise) {
            var _this = this;
            this.promises_.push(promise);
            promise.then(function () {
                _this.markCompleted_(promise);
                _this.checkForCompletion_();
            }, function (error) {
                _this.failureMessages_.push(error);
                _this.markCompleted_(promise);
                _this.checkForCompletion_();
            });
            return this;
        };
        ValidationPromiseBuilder.prototype.addAll = function (promises) {
            var _this = this;
            promises.forEach(function (promise) { return _this.add(promise); });
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
        function ValidationService() {
        }
        /**
         * Validates an individual attribute (specified by fieldName) according to the provided validation rules.
         *
         * @param fieldName Name of attribute in formData object
         * @param formData Form data
         * @param validationSchema See {@link ValidationSchema}
         * @returns Promise that resolves/rejects based on validation outcome.
         */
        ValidationService.validateField = function (fieldName, formData, validationSchema) {
            // TODO Sanitize/escape incoming fieldName to avoid disallowed characters (e.g. ".", "[0]")
            // See https://github.com/bvaughn/angular-form-for/blob/type-script/source/utils/nested-object-helper.ts#L30
            var value = formData[fieldName];
            var validatableAttribute = validationSchema[fieldName];
            return new formsjs.ValidationPromiseBuilder().add(formsjs.RequiredValidator.validate(value, formData, validatableAttribute)).add(formsjs.TypeValidator.validate(value, formData, validatableAttribute)).add(formsjs.MinMaxValidator.validate(value, formData, validatableAttribute)).add(formsjs.EnumValidator.validate(value, formData, validatableAttribute)).add(formsjs.PatternValidator.validate(value, formData, validatableAttribute)).addAll(formsjs.CustomValidator.validate(value, formData, validatableAttribute)).build();
        };
        return ValidationService;
    })();
    formsjs.ValidationService = ValidationService;
})(formsjs || (formsjs = {}));

return formsjs;
}));
