// include the required packages. 
var gulp = require('gulp');
var stylus = require('gulp-stylus');


gulp.task('watch', function () {
    gulp.watch('./style.styl', ['compress']);
});

gulp.task('compress', function () {
  return gulp.src('./style.styl')
    .pipe(stylus({
      compress: false
    }))
    .pipe(gulp.dest('./src/assets/css/'));
});
 