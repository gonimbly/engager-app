'use strict';

var Rewards = require('../../../db/collections/rewards');
var Code = require('../../../db/models/code');
var Wallet = require('../../../db/models/wallet');

exports.get = function(req, res) {
	Rewards.forge()
		.fetch({
			debug:false,
			required:true
		})
		.then(function(models){
			console.log('models',models);
			res.json(models);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};

exports.redeem = function(req, res) {
	var body = req.body;
	Code.forge({
		reward_id: body.reward_id
	})
	.fetch()
	.then(function(code){
		return code.save({used:true}, {patch:true})
	})
	.then(function(code){
		//decrement the wallet
		return Wallet.forge({
			user_id: body.user_id
		})
		.fetch({require: true})
		.then(function (wallet) {
			var amount = wallet.get('amount');
			amount = parseInt(amount) - parseInt(body.amount);
			wallet.set('amount', amount);
			return wallet.save();
		})
		.then(function(user){
			console.log(Code.sendEmail);
			return code.sendEmail(body);
		})
		.then(function(){
			return res.json(code);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
	})
	.catch(function(err){
		res.status(400).send({error:err.message});
	});
};
