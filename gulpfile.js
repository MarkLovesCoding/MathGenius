const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

//Compile SASS


function compileSass() {
    return gulp.src('public/scss/styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
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

function copyHtml() {
    return gulp.src('public/**/*.html').pipe(gulp.dest('dist'));
  }
  
  gulp.task('copy-html', copyHtml);
  
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
    gulp.watch('public/**/*.html').on('change', browserSync.reload);
}

gulp.task('dev', gulp.series('sass', 'babel', 'copy-html', startServer));

// default task
gulp.task('default', gulp.series('dev'));
