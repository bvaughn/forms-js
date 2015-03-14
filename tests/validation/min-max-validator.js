describe('RequiredValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;

  beforeEach(function() {
    JasminePromisMatchers.install(true);

    validator = new formsjs.MinMaxValidator();
  });

  afterEach(function() {
    JasminePromisMatchers.uninstall();
  });

  describe('minimum:', function() {
    beforeEach(function() {
      validatableAttribute = {
        min: 2
      };
    });

    it('should reject values that are less than the specified minimum with custom failure message', function() {
      validatableAttribute.minFailureMessage = '${value} is not ${min}!';

      var promises = validator.validate(0, {}, validatableAttribute);

      expect(promises.length).toBe(1);
      expect(promises[0]).toBeRejectedWith('0 is not 2!');
    });

    describe('strings:', function() {
      it('should accept values that greater than or equal to the specified minimum', function() {
        var values = ['ab', 'abc'];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(0);
        });
      });

      it('should reject values that less than the specified minimum', function() {
        var values = ['', 'a'];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(1);
          expect(promises[0]).toBeRejected();
        });
      });
    });

    describe('numbers:', function() {
      it('should accept values that greater than or equal to the specified minimum', function() {
        var values = [2, 3];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(0);
        });
      });

      it('should reject values that less than the specified minimum', function() {
        var values = [0, 1];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(1);
          expect(promises[0]).toBeRejected();
        });
      });
    });
  });

  describe('maximum:', function() {
    beforeEach(function() {
      validatableAttribute = {
        max: 2
      };
    });

    it('should reject values that are greater than the specified maximum with custom failure message', function() {
      validatableAttribute.maxFailureMessage = '${value} is more than ${max}!';

      var promises = validator.validate(3, {}, validatableAttribute);

      expect(promises.length).toBe(1);
      expect(promises[0]).toBeRejectedWith('3 is more than 2!');
    });

    describe('strings:', function() {
      it('should accept values that less than or equal to the specified maximum', function() {
        var values = ['', 'a', 'ab'];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(0);
        });
      });

      it('should reject values that greater than the specified maximum', function() {
        var promises = validator.validate('abc', {}, validatableAttribute);

        expect(promises.length).toBe(1);
        expect(promises[0]).toBeRejected();
      });
    });

    describe('numbers:', function() {
      beforeEach(function() {
        validatableAttribute = {
          max: 2
        };
      });

      it('should accept values that less than or equal to the specified maximum', function() {
        var values = [0, 1, 2];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(0);
        });
      });

      it('should reject values that greater than the specified maximum', function() {
        var promises = validator.validate(3, {}, validatableAttribute);

        expect(promises.length).toBe(1);
        expect(promises[0]).toBeRejected();
      });
    });
  });

  describe('ranges:', function() {
    beforeEach(function() {
      validatableAttribute = {
        min: 2,
        max: 4
      };
    });

    describe('strings:', function() {
      it('should reject values that are less than the expected range', function() {
        var values = ['', 'a'];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(1);
          expect(promises[0]).toBeRejected();
        });
      });

      it('should reject values that are greater than the expected range', function() {
        var values = ['abcde'];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(1);
          expect(promises[0]).toBeRejected();
        });
      });

      it('should accept values that are within the expected range', function() {
        var values = ['ab', 'abc', 'abcd'];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(0);
        });
      });
    });

    describe('numbers:', function() {
      it('should reject values that are less than the expected range', function() {
        var values = [0, 1];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(1);
          expect(promises[0]).toBeRejected();
        });
      });

      it('should reject values that are greater than the expected range', function() {
        var values = [5];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(1);
          expect(promises[0]).toBeRejected();
        });
      });

      it('should accept values that are within the expected range', function() {
        var values = [2, 3, 4];

        values.forEach(function(value) {
          var promises = validator.validate(value, {}, validatableAttribute);

          expect(promises.length).toBe(0);
        });
      });
    });
  });
});
