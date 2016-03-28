'use strict';

var Answer = require('../../db/models/answer');

exports.up = function(knex, Promise) {

  return knex.transaction (function (t) {
    return Promise.resolve()
      .then(function(){
        return Answer.forge().fetchAll({ transaction: t, debug:true, require:true }).get('models');
      })
      .map(function(model){
        var data;
        if(model.get('value') === 1){
          data = {'emoji': '😡'};
        }
        if(model.get('value') === 2){
          data = {'emoji': '😕'};
        }
        if(model.get('value') === 3){
          data = {'emoji': '🙂'};
        }
        if(model.get('value') === 4){
          data = {'emoji': '😃'};
        }
        if(model.get('value') === 5){
          data = {'emoji': '😍'};
        }
        return model.save(data, { transaction: t, patch: true});
      });
    });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};