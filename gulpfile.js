var gulp = require('gulp');
var webpack = require('gulp-webpack');
var nodemon = require('gulp-nodemon');
var _create = require('lodash.create');

var webpackConfig = require('./webpack.config.js');
var files = {
  main: './app/main.js',
  scripts: [
    './app/scripts/**/*.(js|jsx)',
    './app/scripts/**/*.scss'
  ],
  index: './app/index.html'
}

// ***
// Build index file
// ***
gulp.task('build-index', function() {
  return gulp.src(files.index)
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch-index', ['build-index'], function() {
  return gulp.watch(files.index, ['build-index']);
});

// ***
// Build local files
// ***

gulp.task('build-scripts', function() {
  var config = _create(webpackConfig, {
    entry: {
      main: files.main,
    }
  });
  return gulp.src(files.main)
    .pipe(webpack(config))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch-scripts', ['build-scripts'], function() {
  return gulp.watch(files.scripts, ['build-scripts']);
});

// ***
// Main tasks
// ***
gulp.task('serve', ['watch-index', 'watch-scripts'], function() {
  return nodemon({
    script: 'server.js',
    env: {
      'PORT': 9001,
      'API_URL': 'https://localhost:9000'
    }
  });
});