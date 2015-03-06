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

return fjs;
}));
