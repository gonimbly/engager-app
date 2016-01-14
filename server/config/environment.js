'use strict';

var path = require('path');

// All configurations will extend these options
// ============================================
var environment = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'engager-api-secret'
  }

};

module.exports = environment;