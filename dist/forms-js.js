(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.fjs = factory();
  }
}(this, function() {
/// <reference path="../definitions/es6-promise.d.ts" />
var fjs;
(function (fjs) {
    /**
     * Silly example validator to demonstrate TypeScript syntax (and check my gulpfile building).
     */
    var Example = (function () {
        function Example() {
        }
        Example.prototype.validate = function (something) {
            return new Promise(function (resolve, reject) {
                if (something) {
                    resolve('Well done');
                }
                else {
                    reject('Expected truthy');
                }
            });
        };
        return Example;
    })();
    fjs.Example = Example;
})(fjs || (fjs = {}));
var fjs;
(function (fjs) {
    /**
     * Supported type validations.
     */
    (function (ValidationType) {
        ValidationType[ValidationType["BOOLEAN"] = "boolean"] = "BOOLEAN";
        ValidationType[ValidationType["FLOAT"] = "float"] = "FLOAT";
        ValidationType[ValidationType["INTEGER"] = "integer"] = "INTEGER";
        ValidationType[ValidationType["STRING"] = "string"] = "STRING";
    })(fjs.ValidationType || (fjs.ValidationType = {}));
    var ValidationType = fjs.ValidationType;
    ;
})(fjs || (fjs = {}));
;
var fjs;
(function (fjs) {
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
    fjs.MinMaxValidator = MinMaxValidator;
})(fjs || (fjs = {}));
var fjs;
(function (fjs) {
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
    fjs.RequiredValidator = RequiredValidator;
})(fjs || (fjs = {}));
var fjs;
(function (fjs) {
    var TypeValidator = (function () {
        function TypeValidator() {
        }
        TypeValidator.validate = function (value, formData, validatableAttribute) {
            if (validatableAttribute.type) {
                var stringValue = value.toString();
                var numericValue = Number(value);
                // TODO Retrieve default validation failure message from i18n service.
                var failureMessage = validatableAttribute.typeFailureMessage || 'This is a required field';
                switch (validatableAttribute.type) {
                    case fjs.ValidationType.BOOLEAN:
                        if (stringValue != 'true' && stringValue != 'false') {
                            return Promise.reject(failureMessage);
                        }
                        break;
                    case fjs.ValidationType.FLOAT:
                        if (stringValue && isNaN(numericValue)) {
                            return Promise.reject(failureMessage);
                        }
                        break;
                    case fjs.ValidationType.INTEGER:
                        if (stringValue && (isNaN(numericValue) || numericValue % 1 !== 0)) {
                            return Promise.reject(failureMessage);
                        }
                        break;
                    case fjs.ValidationType.STRING:
                    default:
                        break;
                }
            }
            return Promise.resolve();
        };
        return TypeValidator;
    })();
    fjs.TypeValidator = TypeValidator;
})(fjs || (fjs = {}));
var fjs;
(function (fjs) {
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
    fjs.ValidationPromiseBuilder = ValidationPromiseBuilder;
})(fjs || (fjs = {}));
var fjs;
(function (fjs) {
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
            return new fjs.ValidationPromiseBuilder().add(fjs.RequiredValidator.validate(value, formData, validatableAttribute)).add(fjs.TypeValidator.validate(value, formData, validatableAttribute)).add(fjs.MinMaxValidator.validate(value, formData, validatableAttribute)).build();
        };
        return ValidationService;
    })();
    fjs.ValidationService = ValidationService;
})(fjs || (fjs = {}));

return fjs;
}));
