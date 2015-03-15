/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class Flatten {

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
  }
}