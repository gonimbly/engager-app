'use strict';

//modules
var _ = require('lodash');
var Bromise = require('bluebird');
var bcrypt = Bromise.promisifyAll(require('bcrypt'));
var bookshelf = require('bookshelf')(require('../knexpg'));
var gender = require('gender');
var request = require('request');
var validator = require('validator');
//lib
var Answer = require('./answer');
var Question = require('./question');
var QuestionUser = require('./question_user');
var Token = require('../helpers/token');
var Wallet = require('./wallet');

var model = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	parse : function(attrs){
        return _.omit(attrs, 'password');
    },
	questions: function() {
		return this.belongsToMany(Question);
	},
	answers: function() {
		return this.hasMany(Answer);
	},
	wallet: function() {
		return this.hasOne(Wallet);
	},

	/**
	 * Signup
	 * @param {Object} options, The options object.
	 * @param {string} options.email, String for user field.
	 * @param {string} options.password, String for user field.
	 * @returns {Function} 'Ok'
	 */
	authenticate: function (options) {
		var invalidCredentials = 'Invalid username or password';
		if (!validator.isEmail(options.email)) {
			throw new Error('Invalid email address');
		}
		if (!validator.isLength(options.password, 4)) {
			throw new Error('Password must be at least 4 characters');
		}

		return Bromise.resolve().then(function(){
			return model.forge({email: options.email})
				.fetch()
				.then(function (user) {
					if(!user) {
						throw new Error(invalidCredentials);
					}
					return this.comparePassword(options.password, user.get('password'))
						.then(function (match) {
							// if (err) return callback(err);
							if (match) {
								return token.forge()
									.createAccessToken(user.toJSON())
									.then(function(token) {
										return{'user':{'email': user.get('email'), 'first': user.get('first'), 'last': user.get('last')}, 'token': token};
									});
							} else {
								// Passwords don't match
								throw new Error(invalidCredentials);
							}
						}, 	function(err){
							return err;
						});
				});
		});
	},

	/**
	 * Compare clear with hashed password
	 * @param password
	 * @param hash
	 */
	comparePassword: function (password, hash) {
		return Bromise.resolve().then(function(){
			return bcrypt.compareAsync(password, hash)
				.then(function (match) {
					return match;
				}, function(error){
					return error;
				});
		});
	},

	/**
	 * Encrypt password with per-user salt
	 * @param password
	 */
	encryptPassword: function (password) {
		return Bromise.resolve().then(function(){
			return bcrypt.genSaltAsync(10)
				.then(function (salt) {
					return bcrypt.hashAsync(password, salt);
				}, function(err){
					return err;
				});
		});
	},

	getRandomUserPic: function(guess) {
		guess = (guess === 'unknown') ? 'male' : guess;
	    return new Bromise(function(resolve, reject) { 
	        request(['https://randomuser.me/api/?gender=',guess].join(''), function (error, response, body) {
	        	if (!error && response.statusCode == 200) {
	        		resolve(JSON.parse(body).results[0].user.picture.medium);
	        	}
	        	else {
	        		reject(error);
	        	}
			});
	    });
	},

	/**
	 * Signup
	 * @param {Object} options, The options object.
	 * @param {string} options.email, String for user field.
	 * @param {string} options.firstName, String for user field.
	 * @param {string} options.lastName, String for user field.
	 * @param {string} options.password, String for user field.
	 * @returns {Function} 'Ok'
	 */
	signup: function (options) {
		console.log('options',options);
		if (!validator.isEmail(options.email)) {
			throw new Error('Invalid email address');
		}
		if (!validator.isLength(options.first, 1)) {
			throw new Error('First name must be at least one character');
		}
		if (!validator.isLength(options.last, 1)) {
			throw new Error('Last name must be at least one character');
		}
		if (!validator.isLength(options.password, 4)) {
			throw new Error('Password must be at least 4 characters');
		}

		options.email = options.email.toLowerCase();
		return Bromise.resolve().then(function(){
			return model.forge({email: options.email})
				.fetch()
				.then(function (user) {
					if(user) {
						throw new Error('Email address already registered');
					}
					return this.encryptPassword(options.password)
						.then(function (hash) {
							var guess = gender.guess(options.first);
							return this.getRandomUserPic(guess.gender)
								.then(function(picture_url){
									var newUser = {
										email: options.email,
										first: options.first,
										last: options.last,
										password: hash,
										picture_url: picture_url
									};
									return model.forge(newUser).save();
								});
						}.bind(this))
						.tap(function (newUser) {
							return Wallet.forge({
									user_id: newUser.id,
									amount: 0
								})
								.save();
						})
						.tap(function (newUser) {
							return Question.forge()
								.fetchAll()
								.then(function(questions){
									return questions.map(function(question){
										var qUser = {
											question_id: question.id,
											user_id: newUser.id,
											state: 'new'
										}
										return QuestionUser.forge(qUser).save();
									});
								});
						})
						.then(function (newUser) {
							return Token.createAndWriteAccessToken(newUser);
						});
				});
		});
	}
});

module.exports = model;
