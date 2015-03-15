describe('CustomValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromiseMatchers.install();

    validator = new formsjs.CustomValidator();

    validatableAttribute = {
      validators: []
    };
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();
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

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejected();
  });

  it('should treat strings returned from custom validator functions as error messages', function() {
    validatableAttribute.validators.push(function() {
      return 'This is an error message';
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejected();
    expect(promises[0]).toBeRejectedWith('This is an error message');
  });

  it('should return a default failure message for promises rejected without arguments', function() {
    validatableAttribute.validators.push(function() {
      return new Promise(
        function(resolve, reject) {
          reject();
        });
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejected();
  });

  it('should return an overridden failure message for promises rejected with overrides', function() {
    validatableAttribute.validators.push(function() {
      return new Promise(
        function(resolve, reject) {
          reject('${value} failure message override');
        });
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejected();
    expect(promises[0]).toBeRejectedWith('foo failure message override');
  });

  it('should pass through Promises as-is', function() {
    validatableAttribute.validators.push(function() {
      return new Promise(
        function(resolve, reject) {
          resolve();
        });
    });

    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeResolved();
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
    expect(promises[1] instanceof Promise).toBeTruthy();
  });
});
