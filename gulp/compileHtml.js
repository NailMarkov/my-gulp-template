import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import bemLinter from 'gulp-html-bemlinter';

// Import from files

import {pathBuild, pathSrc} from './conf.js';
import {server} from '../gulpfile.js';

// Task configuration
const pug = () =>
  gulp
      .src(`${pathSrc.src}/pug/pages/*.pug`)
      .pipe(gulpPug({pretty: true}))
      .pipe(bemLinter())
      .pipe(gulp.dest(`${pathBuild.build}`))
      .pipe(server.stream());

export {pug};
