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
	var redeem = req.body;
	Code.forge({
		reward_id: redeem.reward_id
	})
	.fetch()
	.then(function(code){
		return code.save({used:true}, {patch:true})
	})
	.then(function(code){
		// mark as use
		// code.set("used", true);
		// code.save();
		console.log('code',code);
		//decrement the wallet
		return Wallet.forge({
			user_id: redeem.user_id
		})
		.fetch({require: true})
		.then(function (wallet) {
			var amount = wallet.get("amount");
			amount = parseInt(amount) - parseInt(redeem.amount);
			wallet.set("amount", amount);
			return wallet.save();
		})
		.then(function(){
			return res.json(code);
		})
		.catch(function(err){
			console.error('err',err);
			res.status(400).send({error:err.message});
		});

	})
	.catch(function(err){
		res.status(400).send({error:err.message});
	});
};
