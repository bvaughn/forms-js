/// <reference path="../../../definitions/es6-promise.d.ts" />

module formsjs {

  export class AbstractValidator implements Validator {

    protected strings_:Strings;

    constructor(strings?:Strings) {
      this.strings_ = strings || new Strings();
    }

    public get strings():Strings {
      return this.strings_;
    }
    public set strings(value:Strings) {
      this.strings_ = value;
    }

    public validate(value:any, formData:any, validatableAttribute:ValidatableAttribute):Array<Promise<string>> {
      throw Error('Abstract validate method must be overridden.');
    }
  }
}