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
          return models.map(function(model){
            console.log('model.toJSON().emoji',model.toJSON().emoji);
            if(model.get('value') === 1){
              model.set('emoji',':rage:')
            }
            if(model.get('value') === 2){
              model.set('emoji', ':confused:')
            }
            if(model.get('value') === 3){
              model.set('emoji', ':slightly_smiling_face:')
            }
            if(model.get('value') === 4){
              model.set('emoji', ':smiley:')
            }
            if(model.get('value') === 5){
              model.set('emoji', ':heart_eyes:')
            }
            console.log('model.toJSON().emoji',model.toJSON().emoji);

            return model.save();
          });
        })
        .catch(function(bad){
          console.log('bad',bad);
        })
    })
    .then(function(){
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