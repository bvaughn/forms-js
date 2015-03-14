describe('RequiredValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = formsjs.MinMaxValidator;
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  describe('minimum:', function() {
    it('should reject values that are less than the specified minimum with custom failure message', function() {
      validatableAttribute = {
        min: 1,
        minFailureMessage: '${value} is not ${min}!'
      };

      expect(validator.validate(0, {}, validatableAttribute)).toBeRejectedWith('0 is not 1!');
    });

    describe('string enums', function() {
      beforeEach(function() {
        validatableAttribute = {
          min: 2
        };
      });

      it('should accept values that greater than or equal to the specified minimum', function() {
        expect(validator.validate('ab', {}, validatableAttribute)).toBeResolved();
        expect(validator.validate('abc', {}, validatableAttribute)).toBeResolved();
      });

      it('should reject values that less than the specified minimum', function() {
        expect(validator.validate('', {}, validatableAttribute)).toBeRejected();
        expect(validator.validate('a', {}, validatableAttribute)).toBeRejected();
      });
    });

    describe('numeric enums', function() {
      beforeEach(function() {
        validatableAttribute = {
          min: 2
        };
      });

      it('should accept values that greater than or equal to the specified minimum', function() {
        expect(validator.validate(2, {}, validatableAttribute)).toBeResolved();
        expect(validator.validate(3, {}, validatableAttribute)).toBeResolved();
      });

      it('should reject values that less than the specified minimum', function() {
        expect(validator.validate(0, {}, validatableAttribute)).toBeRejected();
        expect(validator.validate(1, {}, validatableAttribute)).toBeRejected();
      });
    });
  });

  describe('maximum:', function() {
    it('should reject values that are greater than the specified maximum with custom failure message', function() {
      validatableAttribute = {
        max: 1,
        maxFailureMessage: '${value} is more than ${max}!'
      };

      expect(validator.validate(2, {}, validatableAttribute)).toBeRejectedWith('2 is more than 1!');
    });

    describe('string enums', function() {
      beforeEach(function() {
        validatableAttribute = {
          max: 2
        };
      });

      it('should accept values that less than or equal to the specified maximum', function() {
        expect(validator.validate('', {}, validatableAttribute)).toBeResolved();
        expect(validator.validate('a', {}, validatableAttribute)).toBeResolved();
        expect(validator.validate('ab', {}, validatableAttribute)).toBeResolved();
      });

      it('should reject values that greater than the specified maximum', function() {
        expect(validator.validate('abc', {}, validatableAttribute)).toBeRejected();
      });
    });

    describe('numeric enums', function() {
      beforeEach(function() {
        validatableAttribute = {
          max: 2
        };
      });

      it('should accept values that less than or equal to the specified maximum', function() {
        expect(validator.validate(0, {}, validatableAttribute)).toBeResolved();
        expect(validator.validate(1, {}, validatableAttribute)).toBeResolved();
        expect(validator.validate(2, {}, validatableAttribute)).toBeResolved();
      });

      it('should reject values that greater than the specified maximum', function() {
        expect(validator.validate(3, {}, validatableAttribute)).toBeRejected();
      });
    });
  });
});
