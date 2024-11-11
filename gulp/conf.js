// Paths

const pathBuild = {
  build: 'build',
  css: 'build/css',
  data: 'build/data',
  files: 'build/files',
  fonts: 'build/fonts',
  js: 'build/js',
  img: 'build/img',
};

const pathSrc = {
  src: 'src',
  data: 'src/data',
  fonts: 'src/fonts',
  files: 'src/files',
  sass: 'src/sass',
  js: 'src/js',
  img: 'src/img',
  sprite: 'src/img/sprite',
};

// Error messages notify

const errorMessages = (error) => {
  return {
    title: error,
    message: 'Error: <%= error.message %>',
    sound: false,
  };
};

export {pathBuild, pathSrc, errorMessages};
