'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var Reward = require('../models/reward');

var Collection = bookshelf.Collection.extend({
	model: Reward
});
module.exports = Collection;