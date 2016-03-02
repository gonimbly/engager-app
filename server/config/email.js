'use strict';

var path = require('path');

// All configurations will extend these options
// ============================================
var email = {
  api_key : process.env.MAILGUN_API_KEY,
  domain : process.env.EMAIL_DOMAIN,
  from : process.env.EMAIL_FROM,
  additional_bcc : process.env.EMAIL_ADDITIONAL_BCC,
  text : process.env.EMAIL_TEXT,
  subject : process.env.EMAIL_SUBJECT
};

module.exports = email;