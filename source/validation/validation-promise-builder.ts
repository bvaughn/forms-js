/// <reference path="../../definitions/es6-promise.d.ts" />

module formsjs {

  export class ValidationPromiseBuilder {

    private failureMessages_:Array<string>;
    private promise_:Promise<any>;
    private promiseRejecter_:(error?:any) => void;
    private promiseResolver_:(value?:any) => void;
    private promises_:Array<Promise<any>>;

    constructor(promises?:Array<Promise<any>>) {
      this.promises_ = promises || [];
      this.failureMessages_ = [];
    }

    /**
     * Adds validation Promises to the watched collection.
     *
     * @param promises Set of validation promise to observe
     * @returns A reference to the current ValidationPromiseBuilder
     */
    public add(promises:Array<Promise<any>>):ValidationPromiseBuilder {
      promises.forEach((promise) => {
        this.promises_.push(promise);

        promise.then(
          () => {
            this.markCompleted_(promise);
            this.checkForCompletion_();
          },
          (error:any) => {
            this.failureMessages_.push(error);
            this.markCompleted_(promise);
            this.checkForCompletion_();
          }
        );
      });

      return this;
    }

    /**
     * Creates a Promise to be resolved or rejected once all watched validation Promises complete.
     */
    public build():Promise<any> {
      this.promise_ = new Promise(
        (resolve:(value?:any) => void, reject:(error?:any) => void) => {
          this.promiseResolver_ = resolve;
          this.promiseRejecter_ = reject;
        });

      this.checkForCompletion_();

      return this.promise_;
    }

    private checkForCompletion_():void {
      if (this.promise_ && this.promises_.length === 0) {
        if (this.failureMessages_.length > 0) {
          this.promiseRejecter_(this.failureMessages_);
        } else {
          this.promiseResolver_();
        }
      }
    }

    private markCompleted_(promise:Promise<any>):void {
      this.promises_.splice(
        this.promises_.indexOf(promise), 1);
    }
  }
}