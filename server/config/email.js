'use strict';

var path = require('path');

// All configurations will extend these options
// ============================================
var email = {
  api_key : process.env.MAILGUN_API_KEY,
  domain : process.env.EMAIL_DOMAIN,
  from : process.env.EMAIL_FROM,
  additional : process.env.EMAIL_ADDITIONAL,
  text : process.env.EMAIL_TEXT,
  subject : process.env.EMAIL_SUBJECT
};

module.exports = email;