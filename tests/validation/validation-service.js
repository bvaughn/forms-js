describe('ValidationService:', function() {
  'use strict';

  var validatableAttribute;
  var validationSchema;
  var validationService;

  beforeEach(function () {
    JasminePromiseMatchers.install();

    validatableAttribute = {};
    validationSchema = {
      field: validatableAttribute
    };

    validationService = new formsjs.ValidationService();
  });

  afterEach(function () {
    JasminePromiseMatchers.uninstall();
  });

  describe('validateField:', function() {
    it('should accept fields with empty validation rules', function () {
      expect(validationService.validateField('field', {field: null}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: undefined}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: 0}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: 1}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: true}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: false}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: 'value'}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: []}, validationSchema)).toBeResolved();
      expect(validationService.validateField('field', {field: {}}, validationSchema)).toBeResolved();
    });

    it('should accept fields without validation rules', function () {
      expect(validationService.validateField('field', {field: null}, {})).toBeResolved();
    });

    it('should support fields that have not been initialized', function () {
      expect(validationService.validateField('field', {}, {})).toBeResolved();
    });

    it('should accept fields that meet the validation criteria', function () {
      var formData = {
        field: 123
      };

      validationSchema.field.required = true;
      validationSchema.field.type = formsjs.ValidationType.INTEGER;

      expect(validationService.validateField('field', formData, validationSchema)).toBeResolved();
    });

    it('should reject fields if even a single validation fails', function () {
      var formData = {
        field: 'foo'
      };

      validationSchema.field.required = true;
      validationSchema.field.type = formsjs.ValidationType.INTEGER;
      validationSchema.field.typeFailureMessage = 'Foo is not an integer.';

      var promise = validationService.validateField('field', formData, validationSchema);

      expect(promise).toBeRejectedWith(['Foo is not an integer.']);
    });

    it('should reject fields with an array of failures if multiple validations fail', function () {
      var formData = {
        field: 'baz'
      };

      validationSchema.field.enumeration = ['foo', 'bar'];
      validationSchema.field.enumerationFailureMessage = 'Foo is not in the set.';
      validationSchema.field.type = formsjs.ValidationType.INTEGER;
      validationSchema.field.typeFailureMessage = 'Foo is not an integer.';

      var promise = validationService.validateField('field', formData, validationSchema);

      expect(promise).toBeRejected();

      var failureMessages = [];

      promise.then(function(result) {}, function(error) {
        failureMessages = error;
      });

      jasmine.clock().tick(1); // Force synchronous Promise resolution.

      expect(failureMessages).toContain('Foo is not in the set.');
      expect(failureMessages).toContain('Foo is not an integer.');
    });
  });

  describe('getValidatableAttribute:', function() {
    beforeEach(function() {
      validationSchema = {
        topLevelField: {required: true, type: 'string'},
        topLevelObject: {
          nestedField: {required: true, type: 'float'}
        },
        topLevelArray: {
          type: 'array',
          min: 1,
          items: {
            nestedField: {required: true, type: 'boolean'}
          }
        }
      };
    });

    it('should find validation rules for a top-level field if one is registered', function () {
      var validatableAttribute = validationService.getValidatableAttribute_('topLevelField', validationSchema);

      expect(validatableAttribute).toBeTruthy();
      expect(validatableAttribute.required).toBeTruthy();
      expect(validatableAttribute.type).toBe('string');
    });

    it('should find validation rules for a nested field if one is registered', function () {
      var validatableAttribute = validationService.getValidatableAttribute_('topLevelObject.nestedField', validationSchema);

      expect(validatableAttribute).toBeTruthy();
      expect(validatableAttribute.required).toBeTruthy();
      expect(validatableAttribute.type).toBe('float');
    });

    it('should find validation rules for a collection if one is registered', function () {
      var validatableAttribute = validationService.getValidatableAttribute_('topLevelArray', validationSchema);

      expect(validatableAttribute).toBeTruthy();
      expect(validatableAttribute.type).toBe('array');
      expect(validatableAttribute.min).toBe(1);
    });

    it('should find validation rules for an item nested in a collection if one is registered', function () {
      var fieldNames = [
        'topLevelArray[].nestedField',
        'topLevelArray[0].nestedField',
        'topLevelArray.items.nestedField'
      ];

      fieldNames.forEach(function (fieldName) {
        var validatableAttribute = validationService.getValidatableAttribute_(fieldName, validationSchema);

        expect(validatableAttribute).toBeTruthy();
        expect(validatableAttribute.required).toBeTruthy();
        expect(validatableAttribute.type).toBe('boolean');
      });
    });
  });
});