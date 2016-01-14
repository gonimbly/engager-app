'use strict';

var knexpg = require('../knexpg')
var bookshelf = require('bookshelf')(knexpg);
var Question = require('./question');
var User = require('./user');

var model = bookshelf.Model.extend({
	tableName: 'salesforce.engager_answer__c'
});
module.exports = model;