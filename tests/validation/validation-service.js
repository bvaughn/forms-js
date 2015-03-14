describe('ValidationService:', function() {
  'use strict';

  var validatableAttribute;
  var validationSchema;
  var validationService;

  beforeEach(function () {
    JasminePromisMatchers.install(true);

    validatableAttribute = {};
    validationSchema = {
      field: validatableAttribute
    };

    validationService = new formsjs.ValidationService();
  });

  afterEach(function () {
    JasminePromisMatchers.uninstall();
  });

  describe('validateField:', function() {
    it('should accept fields without validation rules', function () {
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

      validationSchema.field.enum = ['foo', 'bar'];
      validationSchema.field.enumFailureMessage = 'Foo is not in the set.';
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
});