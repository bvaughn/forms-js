describe('RequiredValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install();

    validator = new formsjs.RequiredValidator();

    validatableAttribute = {
      required: true
    };
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should accept truthy values', function() {
    var values = [true, 1, 'value', [1,2,3]];

    values.forEach(function(value) {
      var promises = validator.validate(value, {}, validatableAttribute);

      expect(promises.length).toBe(0);
    });
  });

  it('should reject falsy values', function() {
    var values = [undefined, null, 0, false, ''];

    values.forEach(function(value) {
      var promises = validator.validate(value, {}, validatableAttribute);

      expect(promises.length).toBe(1);
      expect(promises[0]).toBeRejected();
    });
  });

  it('should reject falsy values with custom failure message', function() {
    validatableAttribute.requiredFailureMessage = 'wrong!';

    var promises = validator.validate(false, {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejectedWith('wrong!');
  });
});
