describe('NestedObjectHelper:', function() {
  'use strict';

  var flatten;

  beforeEach(function() {
    flatten = formsjs.Flatten;
  });

  describe('flatten:', function() {
    it('should iterate over all of the keys in a shallow object', function() {
      var keys = flatten.flatten({
        foo: 1,
        bar: 'two',
        baz: true
      });

      expect(keys).toContain('foo');
      expect(keys).toContain('bar');
      expect(keys).toContain('baz');
    });

    it('should iterate over all of the keys in a deep object', function() {
      var keys = flatten.flatten({
        foo: 1,
        deep: {
          bar: 'two',
          deeper: {
            baz: true
          }
        }
      });

      expect(keys).toContain('foo');
      expect(keys).toContain('deep.bar');
      expect(keys).toContain('deep.deeper.baz');
    });
  });
});
