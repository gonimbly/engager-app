'use strict';

var User = require('../../../db/models/user');
var _ = require('lodash');

exports.getNew = function(req, res) {
	User.forge(req.params)
		.fetch({
			debug:false,
			withRelated: [
				{
					'questions' : function(qb) {
						qb.whereIn('state', ['new']);
					}
				}
			]
		})
		.then(function(models){
			res.json(models);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};

exports.getDismissed = function(req, res) {
	User.forge(req.params)
		.fetch({
			debug:false,
			withRelated: [
				{
					'questions' : function(qb) {
						qb.whereIn('state', ['dismissed']);
					}
				}
			]
		})
		.then(function(models){
			res.json(models);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};

exports.getAnswered = function(req, res) {
	User.forge(req.params)
		.fetch({
			debug:false,
			withRelated: [
				{
					'questions' : function(qb) {
						qb.whereIn('state', ['answered']);
					}
				},
				'answers'
			]
		})
		.then(function(user){
			var userJson = user.toJSON();
			var answersByQuestion = _.indexBy(userJson.answers, 'question_id');
			var answeredQuestions = _.map(userJson.questions, function(question) {
				console.log('answeredQuestions');
				console.log(question);
				console.log(answersByQuestion[question.id]);
				question.rate = answersByQuestion[question.id].value;
				question.emoji = answersByQuestion[question.id].emoji;
				return question;
			});
			res.json(answeredQuestions);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};
