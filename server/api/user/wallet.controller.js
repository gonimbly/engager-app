'use strict';

var Wallet = require('../../../db/models/wallet');

exports.get = function(req, res) {
	Wallet.forge(req.params)
		.fetch({
			debug:true,
			required:true
		})
		.then(function(model){
			console.log('model',model);
			res.json(model);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};
