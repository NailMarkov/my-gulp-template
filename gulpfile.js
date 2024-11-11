import gulp from 'gulp';
import browserSync from 'browser-sync';
import {deleteAsync} from 'del';

// Import from files

import {pathBuild, pathSrc} from './gulp/conf.js';
import {pug} from './gulp/compileHtml.js';
import {styles} from './gulp/compileStyles.js';
import {copy, copyImages} from './gulp/copyFiles.js';
import {optimizeJpg, optimizePng, optimizeSvg, sprite} from './gulp/optimizeImages.js';
import {js} from './gulp/compileScripts.js';

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

  gulp.watch(`${pathSrc.src}/pug/**/*.pug`, pug);
  gulp.watch(`${pathSrc.sass}/**/*.{scss,sass}`, styles);
  gulp.watch(`${pathSrc.js}/**/*.js`, js);
  gulp.watch(`${pathSrc.font}/**`, copy);
  gulp.watch(`${pathSrc.sprite}/*.svg`, sprite);
  gulp.watch(`${pathSrc.img}/**/*.{jpg,jpeg,png}`, copyImages);
};

// Tasks

const dev = gulp.series(clean, copy, sprite, gulp.parallel(pug, styles, js), syncServer);
const build = gulp.series(clean, copy, sprite, gulp.parallel(optimizeJpg, optimizePng, optimizeSvg, pug, styles, js), syncServer);

export {build, dev, server};
