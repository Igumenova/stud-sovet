const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const minify = require('gulp-minify');

const sass = gulpSass(dartSass);

gulp.task('sass', () => {
  return gulp
    .src('./gulp-app/client/style/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/style'));
});

gulp.task('js', () => {
  return gulp
    .src('./gulp-app/client/js/**/*.js')
    .pipe(
      minify({
        ext: {
          min: '.js',
        },
        noSource: true,
      }),
    )
    .pipe(gulp.dest('public/js'));
});

// ui tasks

gulp.task('ui-sass', () => {
  return gulp
    .src('./gulp-app/ui/ui.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/ui'));
});

gulp.task('ui-js', () => {
  return gulp.src('./gulp-app/ui/ui.js').pipe(gulp.dest('public/ui'));
});

gulp.task('ui', gulp.series('ui-sass', 'ui-js'));

// admin tasks

gulp.task('admin-sass', () => {
  return gulp
    .src('./gulp-app/admin/style/admin.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/admin/style'));
});

gulp.task('admin-js', () => {
  return gulp
    .src('./gulp-app/admin/js/*.js')
    .pipe(
      minify({
        ext: {
          min: '.js',
        },
        noSource: true,
      }),
    )
    .pipe(gulp.dest('public/admin/js'));
});

// lib task

gulp.task('lib-js', () => {
  return gulp
    .src('./gulp-app/admin/js/lib/*.js')
    .pipe(
      minify({
        ext: {
          min: '.js',
        },
        noSource: true,
      }),
    )
    .pipe(gulp.dest('public/admin/js'));
});


// chat tasks

gulp.task('chat-sass', () => {
  return gulp
    .src('./gulp-app/chat/style/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/chat'));
});

gulp.task('chat-js', () => {
  return gulp
    .src('./gulp-app/chat/js/*.js')
    .pipe(
      minify({
        ext: {
          min: '.js',
        },
        noSource: true,
      }),
    )
    .pipe(gulp.dest('public/chat'));
});

gulp.task(
  'build',
  gulp.series(
    'sass',
    'js',
    'ui-sass',
    'ui-js',
    'chat-sass',
    'chat-js',
    'admin-sass',
    'admin-js',
  ),
);

gulp.task(
  'build-all',
  gulp.series(
    'sass',
    'js',
    'ui-sass',
    'ui-js',
    'admin-sass',
    'admin-js',
    'lib-js'
  ),
);
