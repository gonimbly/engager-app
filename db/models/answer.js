'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var Bromise = require('bluebird');
var Question = require('./question');
var User = require('./user');
var EngagerAnswer = require('./engager_answer__c');

var model = bookshelf.Model.extend({
	tableName: 'answers',
	hasTimestamps: true,
	initialize: function() {
        this.on('saved', function(newModel, attrs, options){
			if(process.env.HEROKUCONNECT_URL){
				var eAnswer = {
					questions_text__c: newModel.get('question_text'),
					value__c: newModel.get('value'),
					emoji__c: newModel.get('emoji'),
					customer_name__c: newModel.get('user_name')
				};
				return EngagerAnswer.forge(eAnswer).save();
			}
			else {
				return Bromise.resolve();
			}
		});
    },
	question: function() {
		return this.belongsTo(Question);
	},
	user: function() {
		return this.belongsTo(User);
	}
});

module.exports = model;