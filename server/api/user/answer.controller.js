'use strict';

var Bromise = require('bluebird');
var Answer = require('../../../db/models/answer');
var QuestionUser = require('../../../db/models/question_user');
var Wallet = require('../../../db/models/wallet');

exports.post = function(req, res) {
	console.log('req.body',req.body);
	console.log('req._user',req._user);
	var answer = req.body;
	var points = answer.points;
	var user_id = req._user.id;

	delete answer.points;

   	Answer.forge()
	   	.save(answer, {debug:true, required:true})
	  	.then(function(model){
	  		//mark question as answered
			QuestionUser.forge({
				question_id: answer.question_id,
				user_id: user_id
			})
			.fetch({require: true})
			.then(function (qu) {
				if (!qu) {
					res.status(400).send({error:"no question user found!"});
				}
				else {
					console.log('qu',qu);
					return Bromise.resolve().then(function(){
						return qu.save({state:"answered"}, {patch:true});
					})
					.then(function(qu){
						console.log('qu',qu);
						return Wallet.forge({
							user_id: answer.user_id
						})
						.fetch({require: true})
						.then(function (wallet) {
							var amount = wallet.get("amount");
							
							amount = parseInt(amount) + parseInt(points);
							//increment the wallet
							return wallet.save({amount:amount}, {patch:true});
						});
					});
				}
			})
			.then(function(){
				res.json(answer);
			})
			.catch(function(err){
		  		console.error('err',err);
		  		res.status(400).send({error:err.message});
		  	});
	  	})
	  	.catch(function(err){
	  		console.error('err',err);
	  		res.status(400).send({error:err.message});
	  	});
};
