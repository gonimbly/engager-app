'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var User = require('./user');

var model = bookshelf.Model.extend({
	tableName: 'wallets',
	hasTimestamps: true,
	user: function() {
		return this.belongsTo(User);
	}
});

module.exports = model;
