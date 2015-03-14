describe('PatternValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = formsjs.PatternValidator;

    validatableAttribute = {
      pattern: /foo/
    };
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should accept matching values', function() {
    expect(validator.validate('foo', {}, validatableAttribute)).toBeResolved();
  });

  it('should reject non-matching values', function() {
    expect(validator.validate('bar', {}, validatableAttribute)).toBeRejected();
  });

  it('should reject falsy values with custom failure message', function() {
    validatableAttribute.patternFailureMessage = 'foobar';

    expect(validator.validate('bar', {}, validatableAttribute)).toBeRejectedWith('foobar');
  });
});
