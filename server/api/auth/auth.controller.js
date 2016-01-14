'use strict';

//modules
var Bromise = require('bluebird');
//lib
var Token = require('../../../db/helpers/token');
var User = require('../../../db/models/user');

exports.signup = function(req, res) {
	Bromise.resolve()
		.then(function(){
			return User.forge()
				.signup(req.body)
				.then(function (model) {
					console.log('model',model);
					res.status(200).send(model);
				});
		})
		.catch(function(err){
			console.log('err',err);
			res.status(400).send({error:err.message});
		});
};

exports.login = function(req, res) {
	var invalidCredentials = 'Invalid email or password';
	var email = req.body.email;
	var password = req.body.password;

	if (!email || !password) {
		return res.send(401, invalidCredentials);
	}

	User.forge({email: email.toLowerCase()})
		.fetch({debug:true})
		.then(function (user) {
			if(!user){
				throw new Error(invalidCredentials);
			}
			return user;
		})
		.then(function (user) {
			return Token.createAndWriteAccessToken(user);
		})
		.then(function (token) {
			res.send(token);
		})
		.catch(function(err){
			console.log('err',err);
			res.status(400).send({error:err.message});
		});
};

exports.logout = function(req, res) {
	//do this
};
