import gulp from 'gulp';
import browserSync from 'browser-sync';
import {deleteAsync} from 'del';

// Import from files

import {pathBuild, pathSrc} from './gulp/config.js';
import {pug} from './gulp/compileHtml.js';
import {style} from './gulp/compileStyle.js';
import {copyFiles, copyImages} from './gulp/copy.js';
import {sprite} from './gulp/optimizeImages.js';

// Options

// const streamStyle = () => style().pipe(server.stream());

// Clean

const clean = () => deleteAsync(`${pathBuild.build}`);

// Server

const server = browserSync.create();

const syncServer = () => {
  server.init({
    server: `${pathBuild.build}`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch(`${pathSrc.src}/pug/**/*.pug`, gulp.series(pug, refresh));
  gulp.watch(`${pathSrc.sass}/**/*.{scss,sass}`, style);
  gulp.watch(`${pathSrc.font}/**`, copyFiles);
  gulp.watch(`${pathSrc.sprite}/*.svg`, sprite);
  // gulp.watch(`${pathSource.data}/**/*.{js,json}`, gulp.series(copy, refresh));
  // gulp.watch(`${pathSource.img}/**/*.svg`, gulp.series(copySvg, sprite, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

// Tasks

const dev = gulp.series(clean, copyFiles, sprite, copyImages, gulp.parallel(pug, style), syncServer);

export {dev, server};
