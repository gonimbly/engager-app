'use strict';

var User = require('../../../db/models/user');

exports.getNew = function(req, res) {
	User.forge(req.params)
		.fetch({
			debug:true,
			required:true,
			withRelated: [
				{
					'questions' : function(qb) {
						qb.whereIn('state', ['new']);
					}
				}
			]
		})
		.then(function(models){
			console.log('models',models);
			res.json(models);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};

exports.getDismissed = function(req, res) {
	User.forge(req.params)
		.fetch({
			debug:true,
			required:true,
			withRelated: [
				{
					'questions' : function(qb) {
						qb.whereIn('state', ['dismissed']);
					}
				}
			]
		})
		.then(function(models){
			console.log('models',models);
			res.json(models);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};

exports.getAnswered = function(req, res) {
	User.forge(req.params)
		.fetch({
			debug:true,
			required:true,
			withRelated: [
				{
					'questions' : function(qb) {
						qb.whereIn('state', ['answered']);
					}
				}
			]
		})
		.then(function(models){
			console.log('models',models);
			res.json(models);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};
