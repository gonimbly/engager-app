var gulp = require('gulp');
var open = require('open');
var nodemon = require('nodemon');
var debug = require('gulp-debug');
var webpack = require('gulp-webpack');
var webserver = require('gulp-webserver');
var _create = require('lodash.create');

var webpackConfig = require('./webpack.config.js');
var files = {
  main: './app/main.js',
  app: 'app/**/*.*',
  index: 'app/index.html'
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
  return gulp.watch(files.app, ['build-scripts']);
});

// ***
// Main tasks
// ***

gulp.task('serve', ['watch-index', 'watch-scripts'], function() {
  return nodemon({
    script: 'server/server.js',
    env: {
      'PORT': 9000
    }
  })
  .on('config:update', function() {
    open('http://localhost:9000');
  });
});