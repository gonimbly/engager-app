'use strict';

var Answer = require('../../db/models/answer');

exports.up = function(knex, Promise) {
  return knex.transaction (function (t) {
    return t.schema.table('answers', function(table) {
      table.text('emoji');
    })
  });
};

exports.down = function(knex, Promise) {
  return knex.transaction (function (t) {
    t.schema.table('answers', function(table) {
      table.dropColumn('emoji');
    })
  });
};