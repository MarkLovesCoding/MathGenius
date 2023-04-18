const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
require('dotenv').config();
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
  return gulp.src('public/**/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

gulp.task('babel', transpileJs);

//transpile for build
function transpileBuildJs() {
  return gulp.src('public/**/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'));
}

gulp.task('babel-build', transpileBuildJs);


// Copy HTML files to dist folder
function copyHtml() {
  return gulp.src('public/**/*.html')
    .pipe(gulp.dest('dist'));
}

gulp.task('copy-html', copyHtml);

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
  gulp.watch('public/**/*.html').on('change', gulp.series('copy-html', browserSync.reload));
}

// Build project
function buildProject() {
  return gulp.src(['public/**/*', '!public/scss', '!public/scss/**/*', '!public/js', '!public/js/**/*'])
    .pipe(gulp.dest('dist'));
}


// function copyAssets() {
//     return gulp.src(['public/**/*', '!public/scss', '!public/scss/**/*', '!public/js', '!public/js/**/*'])
//       .pipe(gulp.dest('dist'));
//   }
// Development tasks
let isDev = process.env.NODE_ENV.trim() == 'development';
// isDev = true;

console.log(process.env.NODE_ENV);

    gulp.task('dev', gulp.series('sass', 'babel', 'copy-html', startServer));

    
 gulp.task('build-project',buildProject);

    gulp.task('build', gulp.series('sass', 'babel-build', 'copy-html', 'copy-assets', 'build-project'));

gulp.task('default', gulpif(isDev, gulp.task('dev'), gulp.task('build')));

