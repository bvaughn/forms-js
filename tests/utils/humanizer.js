describe('StringUtil', function() {
  'use strict';

  describe('Humanizer:', function() {
    it('should gracefully handle null and empty strings', function() {
      expect(formsjs.Humanizer.humanize(null)).toEqual('');
      expect(formsjs.Humanizer.humanize(undefined)).toEqual('');
      expect(formsjs.Humanizer.humanize('')).toEqual('');
    });

    it('should convert snake-case variables to humanized strings', function() {
      expect(formsjs.Humanizer.humanize('snake_case')).toEqual('Snake Case');
      expect(formsjs.Humanizer.humanize('snake_case_too')).toEqual('Snake Case Too');
    });

    it('should convert camel-case variables to humanized strings', function() {
      expect(formsjs.Humanizer.humanize('camelCase')).toEqual('Camel Case');
      expect(formsjs.Humanizer.humanize('camelCaseToo')).toEqual('Camel Case Too');
    });

    it('should not convert already-humanized strings', function() {
      expect(formsjs.Humanizer.humanize('Word')).toEqual('Word');
      expect(formsjs.Humanizer.humanize('Humanized String')).toEqual('Humanized String');
    });
  });
});
