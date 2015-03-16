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

  describe('read:', function() {
    var object;

    beforeEach(function() {
      object = {
        object: {
          string: 'bar',
          array: [
            'baz', 'whatcomesafterbaz'
          ]
        },
        string: 'foo',
        number: 123
      };
    });

    it('should read top-level attributes', function() {
      expect(flatten.read('string', object)).toBe('foo');
      expect(flatten.read('number', object)).toBe(123);
    });

    it('should read nested attributes', function() {
      expect(flatten.read('object.string', object)).toBe('bar');
    });

    it('should read array attributes', function() {
      expect(flatten.read('object.array[0]', object)).toBe('baz');
      expect(flatten.read('object.array[1]', object)).toBe('whatcomesafterbaz');
    });

    it('should return undefined for missing properties', function() {
      expect(flatten.read('object.invalid', object)).toBe(undefined);
    });

    it('should return undefined for missing nested properties', function() {
      expect(flatten.read('object.nested.and.invalid', object)).toBe(undefined);
    });

    it('should return undefined for missing array keys', function() {
      expect(flatten.read('object.array[2]', object)).toBe(undefined);
    });
  });

  describe('write:', function() {
    var object;

    beforeEach(function() {
      object = {
        object: {
          string: '',
          array: ['initial']
        },
        string: '',
        number: 0
      };
    });

    it('should write top-level attributes', function() {
      flatten.write('foo', 'string', object);
      flatten.write(123, 'number', object);

      expect(object.string).toBe('foo');
      expect(object.number).toBe(123);
    });

    it('should write nested attributes', function() {
      flatten.write('foo', 'object.string', object);

      expect(object.object.string).toBe('foo');
    });

    it('should override array attributes', function() {
      flatten.write('flip', 'object.array[0]', object);

      expect(object.object.array[0]).toBe('flip');
    });

    it('should add missing array attributes', function() {
      flatten.write('flop', 'object.array[1]', object);

      expect(object.object.array[1]).toBe('flop');
    });

    it('should create undefined keys objects', function() {
      flatten.write('value', 'aNewString', object);
      flatten.write(123, 'aNewNumber', object);
      flatten.write([], 'aNewArray', object);
      flatten.write({}, 'aNewObject', object);

      expect(object.aNewString).toBe('value');
      expect(object.aNewNumber).toBe(123);
      expect(object.aNewArray instanceof Array).toBeTruthy();
      expect(object.aNewObject instanceof Object).toBeTruthy();
    });

    it('should create undefined wrapper objects', function() {
      flatten.write('nowItDoes', 'does.not.exist', object);
      flatten.write('andThisDoesAlso', 'does.not.existEither', object);

      expect(object.does.not.exist).toBe('nowItDoes');
      expect(object.does.not.existEither).toBe('andThisDoesAlso');
    });

    it('should create undefined wrapper arrays', function() {
      flatten.write({}, 'nonexistent[0]', object);
      flatten.write('value', 'nonexistent[0].key', object);

      expect(object.nonexistent).toBeTruthy();
      expect(object.nonexistent[0]).toBeTruthy();
      expect(object.nonexistent[0].key).toBe('value');
    });

    it('should create nested arrays', function() {
      flatten.write('inner', '[0][0]', object);

      expect(object[0] instanceof Array).toBeTruthy();
      expect(object[0][0]).toBe('inner');
    });

    it('should error if an Array is specified at a key containing an object or primative', function() {
      var keys = ['object[0]', 'string[0]', 'number[0]'];

      keys.forEach(function(key) {
        expect(function() {
          flatten.write('foo', key, object);
        }).toThrow();
      });
    });
  });
});
