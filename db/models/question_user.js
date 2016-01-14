'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var User = require('./user');
var Answer = require('./answer');

var model = bookshelf.Model.extend({
	tableName: 'questions_users',
	users: function() {
		return this.belongsTo(User);
	},
	answers: function() {
		return this.hasOne(Answer);
	}
});

module.exports = model;
