/**
 * Silly example test to demonstrate Jasmine syntax (and check my gulpfile testing).
 */
describe('Example', function() {

  var example;
  var rejectedWith;
  var resolvedWith;

  beforeEach(function() {
    example = new fjs.Example();
    rejectedWith = resolvedWith = undefined;

    // Install polyfill if the browser doesn't support ES6 Promises.
    ES6Promise.polyfill();

    // Install mock-clock since Promise polyfill is forced-async for resolutions.
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  var validate = function(value) {
    var promise = example.validate(value);
    example.validate(value).then(
      function(value) {
        resolvedWith = value;
      },
      function(error) {
        rejectedWith = error;
      }
    );

    jasmine.clock().tick('1');
  };

  it('should accept truthy values', function() {
    validate(true);

    expect(resolvedWith).toBeTruthy();
    expect(rejectedWith).toBeFalsy();
  });

  it('should reject falsy values', function() {
    validate(false);

    expect(resolvedWith).toBeFalsy();
    expect(rejectedWith).toBeTruthy();
  });
});