var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create();


gulp.task('build-theme', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});

// gulp.task('watch', ['build-theme'], function() {
//   gulp.watch(['scss/*.scss'], ['build-theme']);
// });

gulp.task('serve', ['build-theme'], function() {

    browserSync.init({
        server: '.',
        port: "6060",
    });

    gulp.watch(['scss/*.scss'], ['build-theme']);
    gulp.watch("index.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
