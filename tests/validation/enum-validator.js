describe('RequiredValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = formsjs.EnumValidator;
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should reject values that are not within the set of enums with custom failure message', function() {
    validatableAttribute = {
      enum: [],
      enumFailureMessage: 'foobar'
    };

    expect(validator.validate('baz', {}, validatableAttribute)).toBeRejected('foobar');
  });

  describe('string enums:', function() {
    beforeEach(function() {
      validatableAttribute = {
        enum: ['foo', 'bar']
      };
    });

    it('should accept values that are within the set of enums', function() {
      expect(validator.validate('foo', {}, validatableAttribute)).toBeResolved();
    });

    it('should reject values that are not within the set of enums', function() {
      expect(validator.validate('baz', {}, validatableAttribute)).toBeRejected();
    });
  });

  describe('numeric enums:', function() {
    beforeEach(function() {
      validatableAttribute = {
        enum: [1, 2]
      };
    });

    it('should accept values that are within the set of enums', function() {
      expect(validator.validate(1, {}, validatableAttribute)).toBeResolved();
    });

    it('should reject values that are not within the set of enums', function() {
      expect(validator.validate(3, {}, validatableAttribute)).toBeRejected();
    });
  });

  describe('object enums:', function() {
    var Foo;
    var Bar;
    var Baz;

    beforeEach(function() {
      Foo  = {};
      Bar = {};
      Baz = {};

      validatableAttribute = {
        enum: [Foo, Bar]
      };
    });

    it('should accept values that are within the set of enums', function() {
      expect(validator.validate(Foo, {}, validatableAttribute)).toBeResolved();
    });

    it('should reject values that are not within the set of enums', function() {
      expect(validator.validate(Baz, {}, validatableAttribute)).toBeRejected();
    });
  });
});
