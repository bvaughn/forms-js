describe('CustomValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = formsjs.CustomValidator;

    validatableAttribute = {
      validators: []
    };
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should ignore truthy values (since they are akin to resolved promises)', function() {
    validatableAttribute.validators.push(function() {
      return true;
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises.length).toBe(0);
  });

  it('should decorate falsy values as rejected promises', function() {
    validatableAttribute.validators.push(function() {
      return false;
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises[0]).toBeRejected();
  });

  it('should pass through Promises as-is', function() {
    var promise = new Promise(function() {});

    validatableAttribute.validators.push(function() {
      return promise;
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises[0]).toBe(promise);
  });

  it('should support multiple return values', function() {
    var promise = new Promise(function() {});

    validatableAttribute.validators.push(function() {
      return true;
    });
    validatableAttribute.validators.push(function() {
      return false;
    });
    validatableAttribute.validators.push(function() {
      return promise;
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises.length).toBe(2);
    expect(promises[0]).toBeRejected();
    expect(promises[1]).toBe(promise);
  });
});
