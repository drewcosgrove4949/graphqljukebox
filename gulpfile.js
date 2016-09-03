const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function() {

  // Node source
  gulp.src("*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));

});