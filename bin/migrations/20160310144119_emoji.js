exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('answers', function(table) {
      table.text('emoji');
    });
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('answers', function(table) {
      table.dropColumn('emoji');
    });
  ]);
};