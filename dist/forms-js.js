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
    var RequiredValidator = (function () {
        function RequiredValidator() {
        }
        RequiredValidator.validate = function (value, formData, validatableAttribute) {
            var required = validatableAttribute.required;
            if (!required || !!value) {
                return Promise.resolve();
            }
            var failureMessage;
            if (required instanceof Object) {
                failureMessage = validatableAttribute.required.failureMessage;
            }
            else {
                failureMessage = 'This is a required field'; // TODO Read from i18n service.
            }
            return Promise.reject(failureMessage);
        };
        return RequiredValidator;
    })();
    fjs.RequiredValidator = RequiredValidator;
})(fjs || (fjs = {}));
var fjs;
(function (fjs) {
    var Validator = (function () {
        function Validator() {
        }
        /**
         * Validates an individual attribute (specified by fieldName) according to the provided validation rules.
         *
         * @param fieldName Name of attribute in formData object
         * @param formData Form data
         * @param validationSchema See {@link ValidationSchema}
         * @returns Promise that resolves/rejects based on validation outcome.
         */
        Validator.validate = function (fieldName, formData, validationSchema) {
            // TODO Sanitize/escape incoming fieldName to avoid disallowed characters (e.g. ".", "[0]")
            // See https://github.com/bvaughn/angular-form-for/blob/type-script/source/utils/nested-object-helper.ts#L30
            var value = formData[fieldName];
            var validatableAttribute = validationSchema[fieldName];
            var promises = [];
            promises.push(fjs.RequiredValidator.validate(value, formData, validatableAttribute));
            // TODO Additional validators here.
            return Promise.all(promises);
        };
        return Validator;
    })();
    fjs.Validator = Validator;
})(fjs || (fjs = {}));

return fjs;
}));
