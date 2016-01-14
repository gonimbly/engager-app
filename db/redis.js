'use strict';

var Bromise = require('bluebird');
var redis = Bromise.promisifyAll(require('redis'));
var parseRedisUrl = require('parse-redis-url')(redis);
var options = parseRedisUrl.parse(process.env.REDIS_URL);
var client = redis.createClient(options.port, options.host, {auth_pass: options.pass});

client.on('ready', function () {
	console.log('redis ready');
});
client.on('error', function (err) {
	console.log('Error ' + err);
});

module.exports = client;