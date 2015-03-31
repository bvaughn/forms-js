'use strict';

module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
    },
    files: [
      'node_modules/es6-promise/dist/es6-promise.js',
      'node_modules/jasmine-es6-promise-matchers/jasmine-es6-promise-matchers.js',
      'dist/forms-js.js',
      'tests/**/*.js'
    ],
    exclude: [],
    port: 9999,
    browsers: [
      'PhantomJS'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
