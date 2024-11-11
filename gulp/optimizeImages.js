import gulp from 'gulp';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import pngQuant from 'imagemin-pngquant';
import mozJpeg from 'imagemin-mozjpeg';
import svgo from 'imagemin-svgo';

// Import from files

import {pathBuild, pathSrc} from './conf.js';

// Configuration

const confSvg = {
  plugins: [
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeRasterImages',
      active: true,
    },
    {
      name: 'removeUselessStrokeAndFill',
      active: false,
    }
  ],
};

const confJpg = {
  quality: 90,
  progressive: true,
};

const confPng = {
  speed: 1,
  strip: true,
  dithering: 1,
  quality: [0.8, 0.9],
};

// Tasks configuration
const sprite = () =>
  gulp
      .src(`${pathSrc.sprite}/*.svg`)
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest(`${pathBuild.img}`));

const optimizeSvg = () =>
  gulp
      .src(`${pathBuild.img}/**/*.svg`)
      .pipe(imagemin([svgo(confSvg)]))
      .pipe(gulp.dest(`${pathBuild.img}`));

const optimizeJpg = () =>
  gulp
      .src(`${pathBuild.img}/**/*.{jpg,jpeg}`, {encoding: false})
      .pipe(imagemin([mozJpeg(confJpg)]))
      .pipe(gulp.dest(`${pathBuild.img}`));

const optimizePng = () =>
  gulp
      .src(`${pathBuild.img}/**/*.png`, {encoding: false})
      .pipe(imagemin([pngQuant(confPng)]))
      .pipe(gulp.dest(`${pathBuild.img}`));

const createWebp = () => {
  const root = '';
  return gulp
      .src(`${pathSrc.img}/${root}**/*.{png,jpg}`, {encoding: false})
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest(`${pathSrc.img}/${root}`));
};

export {sprite, createWebp, optimizeSvg, optimizePng, optimizeJpg};
