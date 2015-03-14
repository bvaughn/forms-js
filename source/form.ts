module formsjs {

  export class Form {

    private strings_:Strings;

    constructor() {
      this.strings_ = new Strings();
    }

    public get strings():Strings {
      return this.strings_;
    }
    public set strings(value:Strings) {
      this.strings_ = value;
    }
  };
};