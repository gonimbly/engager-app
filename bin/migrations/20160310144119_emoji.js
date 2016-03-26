'use strict';

var Answer = require('../../db/models/answer');
var Bromise = require('bluebird');

exports.up = function(knex, Promise) {

  return Bromise.resolve()
    .then(function(){
      // return knex.schema.table('answers', function(table) {
      //     table.text('emoji');
      //   });
      console.log('Answer,',Answer);
      console.log('Answer.forge,',Answer.forge);
      return Answer
        .forge()
        .fetchAll({require: true, debug:true})
        .then(function(models){
          console.log('models',models);
        })
        .catch(function(bad){
          console.log('bad',bad);
        })
    })
    .then(function(obj){
      console.log('obj',obj);
      throw 'Wont finish migration';
    });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('answers', function(table) {
      table.dropColumn('emoji');
    })
  ]);
};