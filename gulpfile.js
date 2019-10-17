/**
 * Material Design Bootstrap 4 Gulpfile:
 *  - Compiling & minifying CSS from SCSS
 *  - Concatenating & minifying JS source
 *  - Generating source maps for CSS & JS
 *  - Rebuild CSS/JS on code modification
 *  - Browser syncing, if desired
 *  - Compressing images
 *  
 * @file   Gulp for Material Design Bootstrap
 * @author Evan Oliver
 * @since  1.0.0
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');


/**
 * CSS Tasks:
 */

// Compile SCSS modules
function compileCssModules() {
  console.log("Compiling & minifying modules, generating source maps.");
  return gulp.src(['scss/**/modules/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer({})]))
    .pipe(sourcemaps.write('./'))
    .pipe(cleanCss())
    .pipe(rename({ dirname: './css/modules/' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'))
}

// Compile source SCSS
function compileCss() {
  console.log("Compiling & minifying main scss, generating source maps.");
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer({})]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/'))
}


/**
 * JavaScript Tasks:
 */

// Compile source JS
function compileJs() {
  console.log("Concatenating & minifying JS, generating source maps.");
  const plugins = getJSModules();
  return gulp.src(plugins.modules)
    .pipe(concat('mdb.js'))
    .pipe(sourcemaps.init())
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js'
      }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'))
}


/**
 * Image Compression:
 */
function compressImages() {
  console.log("Compressing Images.");
  gulp.src('./img/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(gulp.dest('./dist/img'));
}


/**
 * Functions:
 */

// Initialize Browser
function browserInit(){
  browserSync.init({
    server: {
      baseDir: "./dist",
      directory: true
    },
    notify: false
  });
}

// Get list of JS modules to include
function getJSModules() {
  delete require.cache[require.resolve('./js/modules.js')];
  return require('./js/modules');
}


/**
 * Watchers:
 */

// Watch on all sources and compile SCSS modules
function mdb_go() {
  console.log("Compiling CSS Modules");
  compileCssModules();
  console.log("Syncing Browser, Monitoring source JS, SCSS and Images for changes.");
  browserInit()
  gulp.watch("scss/**/*.scss", gulp.series(compileCss), browserSync.reload);
  gulp.watch("js/**/*.js", gulp.series(compileJs), browserSync.reload);
  gulp.watch("**/*", {cwd: './img/'}, gulp.series(compressImages), browserSync.reload);
}

// Watch on SCSS & JS sources (if you are serving with something else: i.e. flask, serve, nginx, apache...)
function watcher() {
  console.log("Monitoring source JS and SCSS for changes.");
  gulp.watch("scss/**/*.scss", gulp.series(compileCss));
  gulp.watch("js/**/*.js", gulp.series(compileJs));
}


/**
 * Gulp commands:
 */

// With no arguments, JS & SCSS are processed
exports.default = gulp.series(compileCss, compileJs);
// Processes/watches everything
exports.mdb_go = gulp.series(compileCss, compileJs, mdb_go);
// Does not lauch a server or browser sync
exports.watch = gulp.series(compileCss, compileJs, watcher);
// Compile SCSS and exit
exports.css = gulp.series(compileCss);
// Compile SCSS modules and exit
exports.css_modules = gulp.series(compileCssModules);
// Compile JS and exit
exports.js = gulp.series(compileJs);
