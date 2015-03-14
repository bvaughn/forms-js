describe('TypeValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;
  var Type;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = formsjs.TypeValidator;
    Type = formsjs.ValidationType;

    validatableAttribute = {};
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  it('should reject falsy values with custom failure message', function() {
    validatableAttribute = {
      type: Type.BOOLEAN,
      typeFailureMessage: 'foobar'
    };

    expect(validator.validate('foobar', {}, validatableAttribute)).toBeRejected('foobar');
  });

  describe('boolean:', function() {
    it('should accept booleans and strings with boolean values', function() {
      expect(validator.validate(true, {}, {type: Type.BOOLEAN})).toBeResolved();
      expect(validator.validate(false, {}, {type: Type.BOOLEAN})).toBeResolved();
      expect(validator.validate('true', {}, {type: Type.BOOLEAN})).toBeResolved();
      expect(validator.validate('false', {}, {type: Type.BOOLEAN})).toBeResolved();
    });

    it('should ignore empty values', function() {
      expect(validator.validate(undefined, {}, {type: Type.BOOLEAN})).toBeResolved();
      expect(validator.validate(null, {}, {type: Type.BOOLEAN})).toBeResolved();
      expect(validator.validate('', {}, {type: Type.BOOLEAN})).toBeResolved();
    });

    it('should reject non-booleans', function() {
      expect(validator.validate(1, {}, {type: Type.BOOLEAN})).toBeRejected();
      expect(validator.validate('T', {}, {type: Type.BOOLEAN})).toBeRejected();
    });
  });

  describe('float:', function() {
    it('should accept all numeric values', function() {
      expect(validator.validate(0, {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate(1, {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate(1.1, {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate(-1.1, {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate('0', {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate('1', {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate('-1', {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate('1.1', {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate('-1.1', {}, {type: Type.FLOAT})).toBeResolved();
    });

    it('should ignore empty values', function() {
      expect(validator.validate(undefined, {}, {type: Type.FLOAT})).toBeResolved();
      expect(validator.validate(null, {}, {type: Type.FLOAT})).toBeResolved();
    });

    it('should reject non-numeric values', function() {
      expect(validator.validate('one', {}, {type: Type.FLOAT})).toBeRejected();
      expect(validator.validate('abc', {}, {type: Type.FLOAT})).toBeRejected();
    });
  });

  describe('integer:', function() {
    it('should accept all integer values', function() {
      expect(validator.validate(0, {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate(1, {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate(1.0, {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate(-1.0, {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate('0', {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate('1', {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate('-1', {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate('1.0', {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate('-1.0', {}, {type: Type.INTEGER})).toBeResolved();
    });

    it('should ignore empty values', function() {
      expect(validator.validate(undefined, {}, {type: Type.INTEGER})).toBeResolved();
      expect(validator.validate(null, {}, {type: Type.INTEGER})).toBeResolved();
    });

    it('should reject non-integer values', function() {
      expect(validator.validate('one', {}, {type: Type.INTEGER})).toBeRejected();
      expect(validator.validate('abc', {}, {type: Type.INTEGER})).toBeRejected();
      expect(validator.validate(1.1, {}, {type: Type.INTEGER})).toBeRejected();
      expect(validator.validate('1.1', {}, {type: Type.INTEGER})).toBeRejected();
    });
  });

  describe('string:', function() {
    it('should accept pretty much anything', function() {
      expect(validator.validate('string', {}, {type: Type.STRING})).toBeResolved();
      expect(validator.validate(1, {}, {type: Type.STRING})).toBeResolved();
      expect(validator.validate(-1.0, {}, {type: Type.STRING})).toBeResolved();
    });

    it('should ignore empty values', function() {
      expect(validator.validate(undefined, {}, {type: Type.STRING})).toBeResolved();
      expect(validator.validate(null, {}, {type: Type.STRING})).toBeResolved();
    });
  });
});
