'use strict';

var Bromise = require('bluebird');
var jwt = require('jwt-simple');
var moment = require('moment');
var redisClient = require('../redis');

var model = {
	createAccessToken: function (user){
		return Bromise.resolve()
			.then(function(){
				var expires = moment().add(1, 'days').valueOf();
				var token = jwt.encode({
					iss: 'https://engager-api.herokuapp.com',
					id: user.id,
					exp: expires
					}, 'royunderhill');

				return token;
			});
	},
	writeAccessToken: function (token, user){
		var TIME_TO_LIVE = 60*60*24; //24 hours
		return redisClient.setexAsync(token, TIME_TO_LIVE, JSON.stringify(user))
			.then(function(){
				return token;
			});
	},
	createAndWriteAccessToken: function(user){
		return Bromise.resolve().then(function(){
			return this.createAccessToken(user)
				.then(function (token) {
					return this.writeAccessToken(token, user);
				}.bind(this));
		}.bind(this));
	},
	extractTokenFromHeader: function(headers) {
		if (!headers) throw new Error('Header is null');
		if (!headers.authorization) throw new Error('Authorization header is null');

		var authorization = headers.authorization;
		var authArr = authorization.split(' ');
		
		if (authArr.length != 2) throw new Error('Authorization header value is not of length 2');

		// retrieve token
		var token = authArr[1];

		return token;
	},
	getUserData: function(token){
		return Bromise.resolve().then(function(){
			return redisClient.getAsync(token);
		})
		.then(function(data){
			if(!data){
				throw new Error('Not authorized');
			}
			return data;
		});
	}
};

module.exports = model;