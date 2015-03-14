describe('RequiredValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = formsjs.RequiredValidator;

    validatableAttribute = {
      required: true
    };
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should accept truthy values', function() {
    expect(validator.validate(true, {}, validatableAttribute)).toBeResolved();
    expect(validator.validate(1, {}, validatableAttribute)).toBeResolved();
    expect(validator.validate('value', {}, validatableAttribute)).toBeResolved();
    expect(validator.validate([1,2,3], {}, validatableAttribute)).toBeResolved();
  });

  it('should reject falsy values', function() {
    expect(validator.validate(undefined, {}, validatableAttribute)).toBeRejected();
    expect(validator.validate(null, {}, validatableAttribute)).toBeRejected();
    expect(validator.validate(0, {}, validatableAttribute)).toBeRejected();
    expect(validator.validate(false, {}, validatableAttribute)).toBeRejected();
    expect(validator.validate('', {}, validatableAttribute)).toBeRejected();
  });

  it('should reject falsy values with custom failure message', function() {
    validatableAttribute.requiredFailureMessage = 'foobar';

    expect(validator.validate(false, {}, validatableAttribute)).toBeRejectedWith('foobar');
  });
});
