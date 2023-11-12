const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean')
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const nodemon = require('gulp-nodemon')
// const ejs = require('gulp-ejs')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')

// require('dotenv').config();

require('dotenv').config({ path: '../environmental/mg/.env' });
gulp.task('compile-ts',function(){
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist/js'))
})

gulp.task('clean', function () {
  return gulp.src('dist/*')
    .pipe(clean());
});

// Compile SASS
function compileSass() {
  return gulp.src('public/scss/styles.scss')
  .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

gulp.task('sass', compileSass);


// Minify CSS
function minifyCss() {
  return gulp.src('dist/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

gulp.task('minify-css', minifyCss);



// Transpile JS with Babel
function transpileJs() {
  return gulp.src('public/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

gulp.task('babel', transpileJs);

// Minify JS
function minifyJs() {
  return gulp.src('dist/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

gulp.task('minify-js', minifyJs);



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
    // .pipe(ejs())
    .pipe(gulp.dest('dist/views'));
}

gulp.task('copy-ejs', copyEjs);

// Copy assets to dist folder
function copyAssets() {
  return gulp.src('public/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
}

gulp.task('copy-assets', copyAssets);


function devServer() {

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

gulp.task('dev', gulp.series('clean', 'sass','compile-ts', 'babel', 'copy-ejs', 'copy-assets',

function nodemonTask(cb) {
  let started = false;

   nodemon({
    script: 'server.js',
    ignore: [ 'node_modules/*'],
    ext: 'js html ejs scss',
    env: { NODE_ENV: 'development' },
    watch: ['server.js', 'routes/*', 'config/*', 'models/*', 'public/scss/*','public/js/*','public/views/*'] // add any additional folders or files to watch here
  })
  .on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('change', ['sass','babel','copy-ejs']); // run the compileSass task when changes are detected in the watched folders

 devServer()}

))


gulp.task('build-project', buildProject);

gulp.task('build', gulp.series('clean', 'sass', 'compile-ts','babel-build', 'copy-ejs', 'copy-assets', 'build-project','minify-css', 'minify-js'));

gulp.task('clean', function () {
  return gulp.src('dist/*')
    .pipe(clean());
});

gulp.task('default', gulpif(isDev, gulp.task('dev'), gulp.task('build')));
