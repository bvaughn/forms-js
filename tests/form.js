describe('Form:', function() {
  'use strict';

  var form;

  beforeEach(function() {
    JasminePromiseMatchers.install();

    form = new formsjs.Form();
    form.formData = {};
    form.validationSchema = {};
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();
  });

  describe('registerAttribute:', function() {
    beforeEach(function() {
      form.validationSchema = {
        myField: {required: true, type: 'string'}
      };
    });

    it('should create and return an AttributeMetadata for the specified field', function () {
      var attributeMetadata = form.registerAttribute('myField');

      expect(attributeMetadata).toBeTruthy();
    });

    it('should allow a field without rules to be registered', function () {
      var attributeMetadata = form.registerAttribute('fieldThatDoesNotExist');

      expect(attributeMetadata).toBeTruthy();
    });

    it('should error if the same field is registered twice', function() {
      form.registerAttribute('myField');

      expect(function() {
        form.registerAttribute('myField')
      }).toThrow();
    });
  });

  describe('validate:', function() {
    beforeEach(function() {
      form.formData = {
        passingFieldOne: 1,
        passingFieldTwo: 1,
        passingCollectionOne: [1, 2, 3],
        failingFieldOne: undefined,
        failingCollectionOne: []
      };

      form.validationSchema = {
        passingFieldOne: {required: true},
        passingFieldTwo: {required: true},
        passingCollectionOne: {type: 'array', min: 2},
        failingFieldOne: {required: true},
        failingFieldTwo: {required: true},
        failingCollectionOne: {type: 'array', min: 2}
      };
    });

    it('should succeed if all registered AttributeMetadata (fields) succeed', function() {
      form.registerAttribute('passingFieldOne');
      form.registerAttribute('passingFieldTwo');

      expect(form.validate()).toBeResolved();
    });

    it('should succeed any a registered collection succeeds', function() {
      form.registerAttribute('passingCollectionOne');

      expect(form.validate()).toBeResolved();
    });

    it('should fail if any of the registered AttributeMetadata (fields) fail', function() {
      form.registerAttribute('passingFieldOne');
      form.registerAttribute('failingFieldOne');

      expect(form.validate()).toBeRejected();
    });

    it('should fail any a registered collection fails', function() {
      form.registerAttribute('failingCollectionOne');

      expect(form.validate()).toBeRejected();
    });
  });
});