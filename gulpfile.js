const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const nodemon = require("gulp-nodemon");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const javascriptObfuscator = require("gulp-javascript-obfuscator");
require("dotenv").config({ path: "./.env" });

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
    .src("src/scss/styles.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
  // .pipe(browserSync.stream());
});

// Task to transpile JavaScript files with Babel
gulp.task("transpile-js", function () {
  return gulp.src("src/js/**/*.js").pipe(babel()).pipe(gulp.dest("dist/js"));
  // .pipe(browserSync.stream());
});

// Task to copy EJS files to dist folder
gulp.task("copy-ejs", function () {
  return gulp.src("src/views/**/*.ejs").pipe(gulp.dest("dist/views"));
});

// Task to copy assets to dist folder
gulp.task("copy-assets", function () {
  return gulp.src("public/assets/**/*").pipe(gulp.dest("dist/assets"));
});

// Task to run development server
// gulp.task("dev-server", function () {
//   gulp.watch("public/scss/**/*.scss", gulp.series("compile-sass"));
//   gulp.watch("public/js/**/*.js", gulp.series("transpile-js"));
//   gulp.watch(
//     "public/views/**/*.ejs",
//     gulp.series("copy-ejs", browserSync.reload)
//   );

//   browserSync.init({
//     server: {
//       baseDir: "./dist",
//       index: "/views/login.ejs",
//     },
//     port: 4000,
//   });
// });
gulp.task("dev", function (done) {
  nodemon({
    script: "server.js", // Specify the entry point of your server
    ext: "js ejs scss", // Watch for changes in JS, EJS, and SCSS files
    watch: ["server.js", "src/js", "src/views", "src/scss"], // Watch these files/folders for changes
    env: { NODE_ENV: "development" }, // Set the NODE_ENV environment variable to "development"
    done: done,
  });
});
// Task to build project
gulp.task("build-project", function () {
  return gulp
    .src([
      "src/**/*",
      "!src/scss",
      "!src/scss/**/*",
      "!src/js",
      "!src/js/**/*",
      "!src/views",
      "!src/views/**/*",
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
  return gulp
    .src("dist/js/**/*.js")
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest("dist/js"));

  // return gulp.src("dist/js/**/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

// Define the default task based on the environment
// gulp.task(
//   "default",
//   gulp.series("clean", function () {
//     if (isDev) {
//       // Development tasks
//       return gulp.series(
//         "compile-ts",
//         "compile-sass",
//         "transpile-js",
//         "copy-ejs",
//         "copy-assets",
//         "dev"
//       )();
//     } else {
//       // Production build tasks
//       return gulp.series(
//         "compile-ts",
//         "compile-sass",
//         "transpile-js",
//         "copy-ejs",
//         "copy-assets",
//         "build-project",
//         "minify-css",
//         "minify-js"
//       )();
//     }
//   })
// );
// Define the default task based on the environment
gulp.task(
  "default",
  gulp.series("clean", function (done) {
    if (isDev) {
      // Development tasks
      gulp.series(
        "compile-ts",
        "compile-sass",
        "transpile-js",
        "copy-ejs",
        "copy-assets",
        "dev"
      )(done);
    } else {
      // Production build tasks
      gulp.series(
        "compile-ts",
        "compile-sass",
        "transpile-js",
        "copy-ejs",
        "copy-assets",
        "build-project",
        "minify-css",
        "minify-js"
      )(done);
    }
  })
);
