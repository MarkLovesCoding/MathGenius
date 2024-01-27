const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

// Define environment variable to differentiate between development and production
const isDev = process.env.NODE_ENV === "development";

// Task to compile TypeScript
gulp.task("compile-ts", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist/js"));
});

// Task to clean the dist directory
gulp.task("clean", function () {
  return gulp.src("dist/*").pipe(clean());
});

// Task to compile SASS
gulp.task("compile-sass", function () {
  return gulp
    .src("public/scss/styles.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// Task to transpile JavaScript files with Babel
gulp.task("transpile-js", function () {
  return gulp
    .src("public/js/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// Task to copy EJS files to dist folder
gulp.task("copy-ejs", function () {
  return gulp.src("public/views/**/*.ejs").pipe(gulp.dest("dist/views"));
});

// Task to copy assets to dist folder
gulp.task("copy-assets", function () {
  return gulp.src("public/assets/**/*").pipe(gulp.dest("dist/assets"));
});

// Task to run development server
gulp.task("dev-server", function () {
  gulp.watch("public/scss/**/*.scss", gulp.series("compile-sass"));
  gulp.watch("public/js/**/*.js", gulp.series("transpile-js"));
  gulp.watch(
    "public/views/**/*.ejs",
    gulp.series("copy-ejs", browserSync.reload)
  );

  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
});

// Task to build project
gulp.task("build-project", function () {
  return gulp
    .src([
      "public/**/*",
      "!public/scss",
      "!public/scss/**/*",
      "!public/js",
      "!public/js/**/*",
      "!public/views",
      "!public/views/**/*",
    ])
    .pipe(gulp.dest("dist"));
});

// Task to minify CSS
gulp.task("minify-css", function () {
  return gulp
    .src("dist/css/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"));
});

// Task to minify JavaScript
gulp.task("minify-js", function () {
  return gulp.src("dist/js/**/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

// Define the default task based on the environment
gulp.task(
  "default",
  gulp.series("clean", function () {
    if (isDev) {
      // Development tasks
      return gulp.series(
        "compile-ts",
        "compile-sass",
        "transpile-js",
        "copy-ejs",
        "copy-assets",
        "dev-server"
      )();
    } else {
      // Production build tasks
      return gulp.series(
        "compile-ts",
        "compile-sass",
        "transpile-js",
        "copy-ejs",
        "copy-assets",
        "build-project",
        "minify-css",
        "minify-js"
      )();
    }
  })
);
