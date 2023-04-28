const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean')
const nodemon = require('gulp-nodemon')
const ejs = require('gulp-ejs')
require('dotenv').config();



gulp.task('clean', function () {
  return gulp.src('dist/*')
    .pipe(clean());
});

// Compile SASS
function compileSass() {
  return gulp.src('public/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

gulp.task('sass', compileSass);

// Transpile JS with Babel
function transpileJs() {
  return gulp.src('public/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

gulp.task('babel', transpileJs);

// Transpile JS for build
function transpileBuildJs() {
  return gulp.src('public/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'));
}

gulp.task('babel-build', transpileBuildJs);

// Copy EJS files to dist folder
function copyEjs() {
  return gulp.src('public/views/**/*.ejs')
    .pipe(ejs())
    .pipe(gulp.dest('dist/views'));
}

gulp.task('copy-ejs', copyEjs);

// Copy assets to dist folder
function copyAssets() {
  return gulp.src('public/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
}

gulp.task('copy-assets', copyAssets);

// Start browser-sync server
function startServer() {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: './dist',
    },
  });
  
  gulp.watch('public/scss/**/*.scss', compileSass);
  gulp.watch('public/js/**/*.js', transpileJs);
  gulp.watch('public/views/**/*.ejs', gulp.series('copy-ejs', browserSync.reload));
}

// Build project
function buildProject() {
  return gulp.src(['public/**/*', '!public/scss', '!public/scss/**/*', '!public/js', '!public/js/**/*', '!public/views', '!public/views/**/*'])
    .pipe(gulp.dest('dist'));
}

// Development tasks
let isDev = process.env.NODE_ENV.trim() == 'development';

gulp.task('dev', gulp.series('clean', 'sass', 'babel', 'copy-ejs', 'copy-assets',
  function startDevServer() {
    nodemon({
      script: 'server.js',
      watch: 'server.js' // watch the server file for changes
    });
    startServer();
  }
));

gulp.task('build-project', buildProject);

gulp.task('build', gulp.series('clean', 'sass', 'babel-build', 'copy-ejs', 'copy-assets', 'build-project'));

gulp.task('clean', function () {
  return gulp.src('dist/*')
    .pipe(clean());
});

gulp.task('default', gulpif(isDev, gulp.task('dev'), gulp.task('build')));
