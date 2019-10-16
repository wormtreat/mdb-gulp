# Gulpfile for Material Design for Bootstrap 4 - jQuery
Gulp version 4 does not work with the MDB/jQuery gulpfile as described in the documentation. This does.

## Instructions

Replace the gulpfile you downloaded with the one in this repo.

Follow the tutorial here: [From the MDB Gulp Instructions](https://mdbootstrap.com/education/bootstrap/gulp-installation/) until step #6.

...

When you reach step 6, run this 'npm install' command instead of what's instructed.

```sh
npm install --save-dev gulp-sass autoprefixer gulp-postcss gulp-clean-css gulp-scss-lint gulp-sourcemaps browser-sync gulp-concat gulp-minify gulp-rename gulp-imagemin
```

## Commands
If no command is given, the default behaviour is to process source SCSS & JS then exit.

#### NOTE: The 'mdb-go' has been changed to mdb_go

1. mdb_go - Processes/watches everything, lauches server with browser sync
2. watch - Processes/watches source SCSS & JS Does not lauch a server or browser sync
3. css - Compile SCSS and exit
4. css_modules - Compile SCSS modules and exit
5. js - Compile JS and exit

### Examples

```sh
gulp mdb_go
gulp watch
gulp css
gulp css_modules
gulp js
gulp
```