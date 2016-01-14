'use strict';

var config = require('../server/config/db');

var knexpg = require('knex')({
    client: 'pg',
    connection: config.connection
});

module.exports = knexpg;