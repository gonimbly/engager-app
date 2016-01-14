'use strict';

var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var config = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(methodOverride());
  app.use(cookieParser());

  if ('production' === env) {
    app.use(cors({
      origin: process.env.CORS_URL
    }));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(cors());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
