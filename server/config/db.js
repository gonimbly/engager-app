'use strict';

//addressing bug w/ knexjs https://github.com/tgriesser/knex/issues/893
var parse = require('pg-connection-string').parse;
var connection = parse(process.env.DATABASE_URL);
connection.ssl = true;

module.exports = {
	connection: connection
};