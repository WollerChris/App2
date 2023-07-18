exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE user_table CASCADE')
  await knex('user_table').del()
  await knex('user_table').insert([
    {fname: 'Fred', lname: 'Smith', username:'fsmith', password:'password'},
    {fname: 'John', lname: 'Row', username:'jrow', password:'password'},
    {fname: 'Susan', lname: 'Green', username:'sgreen', password:'password'},
    {fname: 'Jenny', lname: 'Hunter', username:'jhunter', password:'password'},
  ]);
};