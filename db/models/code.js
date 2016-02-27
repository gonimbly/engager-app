'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var Bromise = require('bluebird');
var CONFIG_EMAIL = require('../../server/config/email');
var Mailgun = require('mailgun-js').Mailgun;
var Question = require('./question');
var User = require('./user');

var model = bookshelf.Model.extend({
  tableName: 'codes',
  hasTimestamps: true,
  question: function() {
    return this.belongsTo(Question);
  },
  user: function() {
    return this.belongsTo(User);
  },

  sendEmail: function(redeemBody) {
    if(this.emailConfigured()){
      return Bromise.resolve().then(function(){
        var mailgun = new Mailgun(CONFIG_EMAIL.api_key);
        var text = CONFIG_EMAIL.text + '\n\n code goes here';
        var to = user.email + ',' + CONFIG_EMAIL.additional;

        mailgun.sendText(CONFIG_EMAIL.from, to, CONFIG_EMAIL.subject, text, CONFIG_EMAIL.domain, {}, function (error) {
          if (error) {
            console.log('message sent error:',error);
          }
          else {
            console.log('message sent');
          }
        });
      });
    }
    else {
      return Bromise.resolve();
    }
  },

  emailConfigured: function(){
    return CONFIG_EMAIL.from && CONFIG_EMAIL.addresses && CONFIG_EMAIL.domain && CONFIG_EMAIL.text && CONFIG_EMAIL.subject;
  }
});

module.exports = model;
