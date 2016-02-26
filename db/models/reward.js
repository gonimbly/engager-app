'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var CONFIG_EMAIL = require('../server/config/email');
var Mailgun = require('mailgun').Mailgun;


var model = bookshelf.Model.extend({
  tableName: 'rewards',
  hasTimestamps: true,

  sendEmail: function(user, code) {
    if(this.emailConfigured()){
      var mailgun = new Mailgun(CONFIG_EMAIL.api_key);
      var data = {
        from: CONFIG_EMAIL.from,
        to: CONFIG_EMAIL.addresses,
        subject: CONFIG_EMAIL.subject,
        text: CONFIG_EMAIL.text + '\n\n code goes here'
      };

      mailgun.sendText(data.from, data.to, data.subject, data.text, CONFIG_EMAIL.domain, {}, function (error) {
        if (error) {
          console.log('message sent error:',error);
        }
        else {
          console.log('message sent');
        }
      });
    }
  },

  emailConfigured: function(){
    return CONFIG_EMAIL.from && CONFIG_EMAIL.addresses && CONFIG_EMAIL.domain && CONFIG_EMAIL.text && CONFIG_EMAIL.subject;
  }

});

module.exports = model;