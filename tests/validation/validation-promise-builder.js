describe('ValidationPromiseBuilder:', function() {
  'use strict';

  var validationPromiseBuilder;

  beforeEach(function () {
    JasminePromisMatchers.install(true);

    validationPromiseBuilder = new formsjs.ValidationPromiseBuilder();
  });

  afterEach(function () {
    JasminePromisMatchers.uninstall();
  });

  it('should resolve an empty array of Promises', function () {
    expect(validationPromiseBuilder.build()).toBeResolved();
  });

  it('should resolve array of Promises that all resolve', function () {
    validationPromiseBuilder.add([
      Promise.resolve(),
      Promise.resolve(),
      Promise.resolve()
    ]);

    expect(validationPromiseBuilder.build()).toBeResolved();
  });

  it('should fail if a single Promise within the collection fails', function () {
    validationPromiseBuilder.add([
      Promise.resolve(),
      Promise.reject('I am a failure'),
      Promise.resolve()
    ]);

    expect(validationPromiseBuilder.build()).toBeRejected();
    expect(validationPromiseBuilder.build()).toBeRejectedWith(['I am a failure']);
  });

  it('should reject with multiple error messages if multiple Promises fail', function () {
    validationPromiseBuilder.add([
      Promise.resolve(),
      Promise.reject('I am a failure'),
      Promise.reject('I am a failure also')
    ]);

    expect(validationPromiseBuilder.build()).toBeRejected();
    expect(validationPromiseBuilder.build()).toBeRejectedWith(['I am a failure', 'I am a failure also']);
  });
});