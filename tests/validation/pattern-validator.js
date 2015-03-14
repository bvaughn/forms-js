describe('PatternValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install();

    validator = new formsjs.PatternValidator();

    validatableAttribute = {
      pattern: /foo/
    };
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should accept matching values', function() {
    var promises = validator.validate('foo', {}, validatableAttribute);

    expect(promises.length).toBe(0);
  });

  it('should reject non-matching values', function() {
    var promises = validator.validate('bar', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejected();
  });

  it('should reject falsy values with custom failure message', function() {
    validatableAttribute.patternFailureMessage = '${value} is wrong!';

    var promises = validator.validate('bar', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejectedWith('bar is wrong!');
  });
});
