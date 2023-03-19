const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

//Compile SASS

function compileSass() {
    return gulp.src('public/scss/styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('public/css'))
      .pipe(browserSync.stream());
  }
  
  gulp.task('sass', compileSass);
  
//Transpile JS with Babel

function transpileJs() {
    return gulp.src('public/js/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
  }
  
  gulp.task('babel', transpileJs);
  

  //start browser sync server

  function startServer() {
    browserSync.init({
      server: {
        baseDir: 'public'
      }
    });
  
    gulp.watch('public/scss/**/*.scss', compileSass);
    gulp.watch('public/js/**/*.js', transpileJs);
    gulp.watch('public/**/*.html').on('change', browserSync.reload);
  }
  
  gulp.task('serve', startServer);
  