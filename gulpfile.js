// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    fileinclude = require('gulp-file-include'),
    connect = require('gulp-connect'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    cssShorthand = require('gulp-shorthand'),
    csslint = require('gulp-csslint'),
    size  = require('gulp-size'),
    uncss = require('gulp-uncss');

function swallowError (error) {
    // If you want details of the error in the console
    console.log(error.toString())
    this.emit('end');
}

// local  server
gulp.task('serve', function() {
return gulp.src('build')
  .pipe(webserver({
      port: 6639,
      livereload: true,
      open: true,
      fallback: 'build/index.html'
  }));
});

// html
gulp.task('fileinclude', function() {
  return gulp.src(['app/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build'))
    .pipe(notify({ message: 'Html task complete' }));
});

// Styles
gulp.task('styles', function() {
  return sass('app/css/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .on('error', swallowError)
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// styles optimization
gulp.task('csslinter', function() {
  gulp.src('build/css/*.css')

      .pipe(uncss({
              html: ['app/pages/**/*.html','app/js/**/*.js']
      }))
    .pipe(cssShorthand())
    .pipe(csslint())
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'Css task complete' }));
});

// styles minimization
gulp.task('cssmin', function() {
  gulp.src(['build/css/*.css', , '!build/css/*.min.css'])
  .pipe(notify({ message: 'Css size' }))
  .pipe(size())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano({
            discardComments: {removeAll: true}
        }))
    .pipe(notify({ message: 'Css min size' }))
    .pipe(size())
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'Css min task complete' }));
});


// Scripts
gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(size())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(size())
    .pipe(gulp.dest('build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('build/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['build/css', 'build/js', 'build/images', 'build/*.html']);
});

gulp.task('css', function() {
  gulp.start('csslinter', 'cssmin');
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'fileinclude', 'css');
});

// Watch
gulp.task('watch', ['serve'], function() {

  // Watch .scss files
  gulp.watch('app/css/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);


  gulp.watch('app/pages/**/*.html', ['fileinclude']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in build/, reload on change
  gulp.watch(['build/**']).on('change', livereload.changed);

});
