describe('ViewSchemaParser', function() {
  'use strict';

  describe('normalize:', function() {
    var ViewSchemaParser;

    function assertFieldView(fieldViews, index, expectedFieldName, expectedInputType) {
      expect(fieldViews.length).toBeGreaterThan(index);

      var fieldView = fieldViews[index];

      expect(fieldView.fieldName).toBe(expectedFieldName);
      expect(fieldView.inputType).toBe(expectedInputType);
    };

    beforeEach(function() {
      ViewSchemaParser = formsjs.ViewSchemaParser;
    });

    it('should gracefully handle falsy values', function() {
      var schemas = [undefined, null, false];

      schemas.forEach(function(schema) {
        var normalized = ViewSchemaParser.normalize(schema);

        expect(normalized.length).toBe(0);
      });
    });

    it('should gracefully empty rules', function() {
      var schemas = [{}, []];

      schemas.forEach(function(schema) {
        var normalized = ViewSchemaParser.normalize(schema);

        expect(normalized.length).toBe(0);
      });
    });

    it('should convert nested objects to an array of field-views', function() {
      var schema = {
        name: {inputType: 'text'},
        address: {
          city: {inputType: 'text'},
          state: {inputType: 'text'},
          zip: {inputType: 'integer'}
        },
        number: {inputType: 'text'}
      };

      var normalized = ViewSchemaParser.normalize(schema);

      expect(normalized.length).toBe(5);
      assertFieldView(normalized, 0, 'name', 'text');
      assertFieldView(normalized, 1, 'address.city', 'text');
      assertFieldView(normalized, 2, 'address.state', 'text');
      assertFieldView(normalized, 3, 'address.zip', 'integer');
      assertFieldView(normalized, 4, 'number', 'text');
    });

    it('should pass through field-view arrays without modification', function() {
      var schema = [
        {fieldName: 'name', inputType: 'text'},
        {fieldName: 'address.city', inputType: 'text'},
        {fieldName: 'address.state', inputType: 'text'},
        {fieldName: 'address.zip', inputType: 'integer'},
        {fieldName: 'number', inputType: 'text'},
      ];

      var normalized = ViewSchemaParser.normalize(schema);

      expect(normalized.length).toBe(5);
      assertFieldView(normalized, 0, 'name', 'text');
      assertFieldView(normalized, 1, 'address.city', 'text');
      assertFieldView(normalized, 2, 'address.state', 'text');
      assertFieldView(normalized, 3, 'address.zip', 'integer');
      assertFieldView(normalized, 4, 'number', 'text');
    });
  });
});
