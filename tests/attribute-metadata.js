describe('AttributeMetadata:', function() {
  'use strict';

  var FIELD_NAME = 'field';

  var attributeMetadata;
  var form;

  beforeEach(function () {
    JasminePromiseMatchers.install();

    form = new formsjs.Form();
    form.formData = {};
    form.validationSchema = {};

    attributeMetadata = new formsjs.AttributeMetadata(form, FIELD_NAME);
  });

  afterEach(function () {
    JasminePromiseMatchers.uninstall();
  });

  describe('validate:', function () {
    it('should store error messages for failed validations', function () {
      form.formData[FIELD_NAME] = null;
      form.validationSchema[FIELD_NAME] = {required: true};

      expect(attributeMetadata.validate()).toBeRejected();
      expect(attributeMetadata.errorMessages.length).toBeTruthy();
    });

    it('should not store error messages for successful validations', function () {
      form.formData[FIELD_NAME] = 'not null';
      form.validationSchema[FIELD_NAME] = {required: true};

      expect(attributeMetadata.validate()).toBeResolved();
      expect(attributeMetadata.errorMessages.length).toBeFalsy();
    });

    it('should allow fields without validation rules', function () {
      form.formData[FIELD_NAME] = null;

      expect(attributeMetadata.validate()).toBeResolved();
      expect(attributeMetadata.errorMessages.length).toBeFalsy();
    });

    it('should set field not-pristine when it is validated', function () {
      form.formData[FIELD_NAME] = null;

      expect(attributeMetadata.pristine).toBeTruthy();

      attributeMetadata.validate();

      // Don't leave a lingering Promise; this could break other tests.
      jasmine.clock().tick(1);

      expect(attributeMetadata.pristine).toBeFalsy();
    });
  });

  describe('reset:', function () {
    it('should reset error messages', function () {
      attributeMetadata.errorMessages_ = ['a', 'b'];
      attributeMetadata.reset();

      expect(attributeMetadata.errorMessages.length).toBeFalsy();
    });

    it('should reset pristine state', function () {
      attributeMetadata.pristine = false;
      attributeMetadata.reset();

      expect(attributeMetadata.pristine).toBeTruthy();
    });
  });
});