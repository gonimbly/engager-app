'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var User = require('./user');
var Answer = require('./answer');

var model = bookshelf.Model.extend({
	tableName: 'questions',
	hasTimestamps: true,
	users: function() {
		return this.belongsToMany(User);
	},
	answers: function() {
		return this.hasMany(Answer);	
	}
});
module.exports = model;