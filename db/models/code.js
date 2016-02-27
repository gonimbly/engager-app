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
        return User.forge({id:redeemBody.user_id}).fetch();
      })
      .then(function(user){
        var mailgun = require('mailgun-js')({apiKey: CONFIG_EMAIL.api_key, domain: CONFIG_EMAIL.domain});
        var text = CONFIG_EMAIL.text + '\n\n code goes here';
        var to = user.get('email');

        var data = {
          from: CONFIG_EMAIL.from,
          to: to,
          subject: CONFIG_EMAIL.subject,
          text: text
        };
        return mailgun.messages().send(data);
      });
    }
    else {
      return Bromise.resolve();
    }
  },

  emailConfigured: function(){
    return CONFIG_EMAIL.api_key && CONFIG_EMAIL.from && CONFIG_EMAIL.domain && CONFIG_EMAIL.text && CONFIG_EMAIL.subject;
  }
});

module.exports = model;