'use strict';

var Wallet = require('../../../db/models/wallet');

exports.get = function(req, res) {
	Wallet.forge(req.params)
		.fetch({
			debug:false,
			required:true
		})
		.then(function(model){
			res.json(model);
		})
		.catch(function(err){
			res.status(400).send({error:err.message});
		});
};
