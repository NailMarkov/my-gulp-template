import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import notify from 'gulp-notify';

const sass = gulpSass(dartSass);
const confPostcss = [
  autoprefixer({
    grid: true,
  })
];

// Import from files

import {pathBuild, pathSrc, errorMessages} from './conf.js';
import {server} from '../gulpfile.js';

// Task configuration
const styles = () =>
  gulp
      .src(`${pathSrc.sass}/style.scss`, {sourcemaps: true})
      .pipe(sass().on('error', notify.onError(errorMessages('SCSS'))))
      .pipe(postcss(confPostcss))
      .pipe(gulp.dest(`${pathBuild.css}`))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest(`${pathBuild.css}`, {sourcemaps: '.'}))
      .pipe(server.stream());

export {styles};
