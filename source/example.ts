/// <reference path="../definitions/es6-promise.d.ts" />

module fjs {

  /**
   * Silly example validator to demonstrate TypeScript syntax (and check my gulpfile building).
   */
  export class Example {

    constructor() {
    }

    public validate(something:any):Promise<string> {
      return new Promise<string>(
        (resolve, reject) => {
          if (something) {
            resolve('Well done');
          } else {
            reject('Expected truthy');
          }
        });
    }
  }
}