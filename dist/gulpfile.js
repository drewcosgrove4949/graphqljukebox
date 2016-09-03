'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {

  // Node source
  gulp.src("*.js").pipe(babel()).pipe(gulp.dest("dist"));
});