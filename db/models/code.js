'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var Question = require('./question');
var User = require('./user');

var model = bookshelf.Model.extend({
	tableName: 'codes',
	hasTimestamps: true,
	question: function() {
		return this.belongsTo(Question);
	},
	user: function() {
		return this.belongsTo(User);
	}
});
module.exports = model;
