import gulp from 'gulp';

// Import from files

import {pathBuild, pathSrc} from './conf.js';

const copySvg = () =>
  gulp.src('source/img/**/*.svg', {base: `${pathSrc.src}`})
      .pipe(gulp.dest(`${pathBuild.build}`));

const copyImages = () =>
  gulp.src('source/img/**/*.{png,jpg,webp}', {base: `${pathSrc.src}`, encoding: false})
      .pipe(gulp.dest(`${pathBuild.build}`));

const copy = () =>
  gulp.src([
    `${pathSrc.fonts}/**`,
    `${pathSrc.img}/**`
  ], {
    base: `${pathSrc.src}`,
    encoding: false,
  })
      .pipe(gulp.dest(`${pathBuild.build}`));

export {copy, copyImages, copySvg};
