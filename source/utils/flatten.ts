/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class Flatten {

    /**
     * Return a (1-dimensional) array of keys representing an object.
     *
     * <p>For example, <code>{foo: {bar: 'baz'}}</code> will become flattened into <code>'['foo', 'foo.bar']</code>.
     */
    public static flatten(object:any):Array<string> {
      var keys:Array<string> = [];

      var queue:Array<any> = [{
        object: object,
        prefix: null
      }];

      while (true) {
        if (queue.length === 0) {
          break;
        }

        var data:any = queue.pop();
        var prefix:string = data.prefix ? data.prefix + '.' : '';

        if (typeof data.object === 'object') {
          for (var prop in data.object) {
            var path:string = prefix + prop;
            var value:any = data.object[prop];

            keys.push(path);

            queue.push({
              object: value,
              prefix: path
            });
          }
        }
      }

      return keys;
    }

    /**
     * Returns the property value of the flattened key or undefined if the property does not exist.
     *
     * <p>For example, the key 'foo.bar' would return "baz" for the object <code>{foo: {bar: "baz"}}</code>.
     */
    public static read(flattenedKey:string, object:any):any {
      var keys:Array<string> = flattenedKey.split(/[\.\[\]]/);

      while (keys.length > 0) {
        var key:any = keys.shift();

        // Keys after array will be empty
        if (!key) {
          continue;
        }

        // Convert array indices from strings ('0') to integers (0)
        if (key.match(/^[0-9]+$/)) {
          key = parseInt(key);
        }

        // Short-circuit if the path being read doesn't exist
        if (!object.hasOwnProperty(key)) {
          return undefined;
        }

        object = object[key];
      }

      return object;
    }

    /**
     * Returns the property value of the flattened key or undefined if the property does not exist.
     *
     * <p>For example, the key 'foo.bar' would return "baz" for the object <code>{foo: {bar: "baz"}}</code>.
     */
    public static write(value:any, flattenedKey:string, object:any):void {
      var currentKey:any;
      var keyIndexStart = 0;

      for (var charIndex = 0, length = flattenedKey.length; charIndex < length; charIndex++) {
        var character = flattenedKey.charAt(charIndex);

        switch(character) {
          case '[':
            currentKey = flattenedKey.substring(keyIndexStart, charIndex);

            this.createPropertyIfMissing_(currentKey, object, Array);
            break;
          case ']':
            currentKey = flattenedKey.substring(keyIndexStart, charIndex);
            currentKey = parseInt(currentKey); // Convert index from string to int

            // Special case where we're targeting this object in the array
            if (charIndex === length - 1) {
              object[currentKey] = value;
            } else {

              // If this is the first time we're accessing this Array key we may need to initialize it.
              if (!object[currentKey] && charIndex < length - 1) {
                switch(flattenedKey.charAt(charIndex + 1)) {
                  case '[':
                    object[currentKey] = [];
                    break;
                  case '.':
                    object[currentKey] = {};
                    break;
                }
              }

              object = object[currentKey];
            }
            break;
          case '.':
            currentKey = flattenedKey.substring(keyIndexStart, charIndex);

            // Don't do anything with empty keys that follow Array indices (e.g. anArray[0].aProp)
            if (currentKey) {
              this.createPropertyIfMissing_(currentKey, object, Object);
            }
            break;
          default:
            continue; // Continue to iterate...
            break;
        }

        keyIndexStart = charIndex + 1;

        if (currentKey) {
          object = object[currentKey];
        }
      }

      if (keyIndexStart < flattenedKey.length) {
        currentKey = flattenedKey.substring(keyIndexStart, flattenedKey.length);

        object[currentKey] = value;
      }
    }

    private static createPropertyIfMissing_(key:string, object:any, propertyType:any):void {
      switch(propertyType) {
        case Array:
          if (!object.hasOwnProperty(key)) {
            object[key] = [];
          } else if (!(object[key] instanceof Array)) {
            throw Error('Property already exists but is not an Array');
          }
          break;
        case Object:
          if (!object.hasOwnProperty(key)) {
            object[key] = {};
          } else if (typeof object[key] !== 'object') {
            throw Error('Property already exists but is not an Object');
          }
          break;
        default:
          throw Error('Unsupported property type');
          break;
      }
    }
  }
}