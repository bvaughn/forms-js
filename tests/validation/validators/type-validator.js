describe('TypeValidator:', function() {
  'use strict';

  var validatableAttribute;
  var validator;
  var Type;

  beforeEach(function() {
    JasminePromiseMatchers.install();

    validator = new formsjs.TypeValidator();
    Type = formsjs.ValidationType;

    validatableAttribute = {};
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();
  });

  it('should reject falsy values with custom failure message', function() {
    validatableAttribute = {
      type: Type.BOOLEAN,
      typeFailureMessage: '${value} should be truthy/falsy!'
    };

    var promises = validator.validate('foobar', {}, validatableAttribute);

    expect(promises.length).toBe(1);
    expect(promises[0]).toBeRejectedWith('foobar should be truthy/falsy!');
  });

  describe('boolean:', function() {
    beforeEach(function() {
      validatableAttribute = {
        type: Type.BOOLEAN
      };
    });

    it('should accept booleans and strings with boolean values', function() {
      var values = [true, false, 'true', 'false'];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should ignore empty values', function() {
      var values = [undefined, null, ''];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should reject non-booleans', function() {
      var values = ['T', 1];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(1);
        expect(promises[0]).toBeRejected();
      });
    });
  });

  describe('float:', function() {
    beforeEach(function() {
      validatableAttribute = {
        type: Type.FLOAT
      };
    });

    it('should accept all numeric values', function() {
      var values = [0, 1, -2, 1.1, -2.2, '0', '1', '-2', '1.1', '-2.2'];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should ignore empty values', function() {
      var values = [undefined, null, ''];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should reject non-numeric values', function() {
      var values = ['one', 'abc'];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(1);
        expect(promises[0]).toBeRejected();
      });
    });
  });

  describe('integer:', function() {
    beforeEach(function() {
      validatableAttribute = {
        type: Type.INTEGER
      };
    });

    it('should accept all integer values', function() {
      var values = [0, 1, 2.0, -3.0, '0', '1', '2.0', '-3.0'];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should ignore empty values', function() {
      var values = [undefined, null, ''];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should reject non-integer values', function() {
      var values = ['one', 'abc', 1.1, -2.3, '1.1', '-3.3'];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(1);
        expect(promises[0]).toBeRejected();
      });
    });
  });

  describe('string:', function() {
    beforeEach(function() {
      validatableAttribute = {
        type: Type.STRING
      };
    });

    it('should accept string values', function() {
      var values = ['string', '1', '-2.0'];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should ignore empty values', function() {
      var values = [undefined, null];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should reject non-string values', function() {
      var values = [[1], {foo: 'bar'}, new Date()];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(1);
        expect(promises[0]).toBeRejected();
      });
    });
  });

  describe('array:', function() {
    beforeEach(function() {
      validatableAttribute = {
        type: Type.ARRAY
      };
    });

    it('should accept array values', function() {
      var values = [[], [0], ['one', 'two']];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should ignore empty values', function() {
      var values = [undefined, null];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(0);
      });
    });

    it('should reject non-array values', function() {
      var values = [1, 'string', {foo: 'bar'}, new Date()];

      values.forEach(function(value) {
        var promises = validator.validate(value, {}, validatableAttribute);

        expect(promises.length).toBe(1);
        expect(promises[0]).toBeRejected();
      });
    });
  });
});
