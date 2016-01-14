'use strict';
var Bromise = require('bluebird');
var Token = require('../../db/helpers/token');

var middleware = {
	verify: function(req, res, next){
		var headers = req.headers;
		if (headers === null) return res.send(401);
		console.log('headers',headers);
		Bromise.resolve().then(function(){
				return Token.extractTokenFromHeader(headers);
			})
			.then(function(token){
				//get from redis
				return Token.getUserData(token);
			})
			.then(function(data){
				req._user = JSON.parse(data);
				return next();
			})
			.catch(function(err){
				res.status(401).send({error:err.message});
			});
	}
};

module.exports = middleware;