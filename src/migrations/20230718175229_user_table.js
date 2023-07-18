exports.up = function(knex) {
    return knex.schema.createTable('user_table', table => {
        table.increments('id');		
        table.string('fname')
        table.string('lname')
        table.string('username')
        table.string('password')
        });
    };
  

exports.down = function(knex) {
        return knex.schema.dropTableIfExists('user_table');	
      };