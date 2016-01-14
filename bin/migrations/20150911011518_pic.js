exports.up = function(knex, Promise) {
	return knex.transaction(function (t) {
		return t.schema.table('users', function (table) {
			table.text('picture_url')
				.defaultTo('https://randomuser.me/api/portraits/med/women/17.jpg');
		});
	});
};

exports.down = function(knex, Promise) {
	return knex.transaction(function (t) {
	    return t.schema.table('users', function (table) {
			table.dropColumn('picture_url');
		});
	});  
};
