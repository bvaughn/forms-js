var gulp = require('gulp');
var karma = require('gulp-karma');
var runSequence = require('run-sequence');

var sources = [
  'source/**/*.ts'
];
var testFiles = []; // Declared in the karma.conf.js
var distDirectory = 'dist';

/**
 * Main task: cleans, builds, run tests, and bundles up for distribution.
 */
gulp.task('all', function(callback) {
  runSequence(
    'clean',
    'build',
    'test',
    callback);
});

gulp.task('build', function(callback) {
  runSequence(
    'compile',
    'uglify',
    'umdify',
    'map',
    callback);
});

gulp.task('compile', function() {
  return buildHelper(sources, distDirectory , 'forms-js.js');
});

gulp.task('clean', function() {
  var clean = require('gulp-clean');

  return gulp.src(distDirectory ).pipe(clean());
});

gulp.task('map', function() {
  var shell = require('gulp-shell');

  console.log('CWD: ' + process.cwd() + '/dist');

  return shell.task(
    'uglifyjs --compress --mangle --source-map forms-js.min.js.map --source-map-root . -o forms-js.min.js -- forms-js.js',
    {cwd: process.cwd() + '/dist'}
  )();
});

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(error) {
      // Make sure failed tests cause gulp to exit non-zero
      throw error;
    });
});

gulp.task('test:watch', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('uglify', function() {
  var fs = require('fs');
  var uglifyJs = require('uglify-js2');

  var code = fs.readFileSync('dist/forms-js.js', 'utf8');

  var parsed = uglifyJs.parse(code);
  parsed.figure_out_scope();

  var compressed = parsed.transform(uglifyJs.Compressor());
  compressed.figure_out_scope();
  compressed.compute_char_frequency();
  compressed.mangle_names();

  var finalCode = compressed.print_to_string();

  fs.writeFileSync('dist/forms-js.min.js', finalCode);
});

gulp.task('umdify', function() {
  umdHelper('dist/forms-js.js', 'dist');
  umdHelper('dist/forms-js.min.js', 'dist');
});

var buildHelper = function(sources, directory, outputFile) {
  var typeScriptCompiler = require('gulp-tsc');

  return gulp
    .src(sources)
    .pipe(typeScriptCompiler({
      module: "CommonJS",
      emitError: false,
      out: outputFile,
      target: 'ES5'
    }))
    .pipe(gulp.dest(directory));
};

var umdHelper = function(sources, directory) {
  var umd = require('gulp-umd');

  return gulp
    .src(sources)
    .pipe(umd({
      exports: function(file) {
        return 'formsjs';
      },
      namespace: function(file) {
        return 'formsjs';
      }
      //template: path.join(__dirname, 'templates/returnExports.js')
    }))
    .pipe(gulp.dest(directory));
};