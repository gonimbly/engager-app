'use strict';

var User = require('../../../db/models/user');

exports.get = function(req, res) {
	var userId = req._user.id;
   	User.forge({id: userId})
	   	.fetch({debug:false, required:true})
	  	.then(function(model){
	  		res.json(model);
	  	})
	  	.catch(function(err){
	  		res.status(400).send({error:err.message});
	  	});
};