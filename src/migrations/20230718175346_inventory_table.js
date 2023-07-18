exports.up = function(knex) {
    return knex.schema.createTable('inventory_table', table => {
        table.increments('id');		
        table.integer('userid');      
        table.string('itemname');
        table.string('description');
        table.integer('quantity');
        });
    };
  
    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('inventory_table');	
      };