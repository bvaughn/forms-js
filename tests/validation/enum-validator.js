describe('RequiredValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = new formsjs.EnumValidator();
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should reject values that are not within the set of enums with custom failure message', function() {
    validatableAttribute = {
      enum: [],
      enumFailureMessage: '${value} is wrong!'
    };

    var promises = validator.validate('baz', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejectedWith('baz is wrong!');
  });

  describe('string enums:', function() {
    beforeEach(function() {
      validatableAttribute = {
        enum: ['foo', 'bar']
      };
    });

    it('should accept values that are within the set of enums', function() {
      var promises = validator.validate('foo', {}, validatableAttribute);

      expect(promises.length).toBe(0);
    });

    it('should reject values that are not within the set of enums', function() {
      var promises = validator.validate('baz', {}, validatableAttribute);

      expect(promises.length).toBe(1);
      expect(promises[0]).toBeRejected();
    });
  });

  describe('numeric enums:', function() {
    beforeEach(function() {
      validatableAttribute = {
        enum: [1, 2]
      };
    });

    it('should accept values that are within the set of enums', function() {
      var promises = validator.validate(1, {}, validatableAttribute);

      expect(promises.length).toBe(0);
    });

    it('should reject values that are not within the set of enums', function() {
      var promises = validator.validate(3, {}, validatableAttribute);

      expect(promises.length).toBe(1);
      expect(promises[0]).toBeRejected();
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
      var promises = validator.validate(Foo, {}, validatableAttribute);

      expect(promises.length).toBe(0);
    });

    it('should reject values that are not within the set of enums', function() {
      var promises = validator.validate(Baz, {}, validatableAttribute);

      expect(promises.length).toBe(1);
      expect(promises[0]).toBeRejected();
    });
  });
});
