exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory_table').del()
  await knex('inventory_table').insert([
    {userid: 1, itemname: 'Trucker Hat, Go Outdoors', description:'Our trucker hats offer a classic mid profile fit - not too tall, not too low. These are one-size-fits-most with an adjustable plastic snap closure. The traditional mesh back gives breathability and comfort.', quantity:8},
    {userid: 3, itemname: 'Lindo Trucker hat', description:'The front panels are structured and made from a quality cotton blend material. Logo is a sewn on woven patch. Our hats are high quality, comfortable, and look great.', quantity:3},
    {userid: 1, itemname: 'Lindo Trucker hat, PINE TREE', description:'manufactured off shore, they are decorated (embroidered, patches sewn, etc) here in the US - in the Pacific Northwest to be exact. We’re proud to partner with an American company.', quantity:12},
    {userid: 2, itemname: 'Lindo Trucker hat, PALM TREE', description:'Hats that celebrate the outdoors, not our company. Because of that our name and logo will never be a visible part of any design…only simple, clean graphics that celebrate an adventurous lifestyle.', quantity:1},
    {userid: 1, itemname: 'WUE Simple Pine Trees Trucker Hats', description:'OUTDOOR DESIGN mens hat trucker represents the wilderness with the unique 3D embroidery Simple Pine Trees. hat makes a great accessories for men and women', quantity:23},
    {userid: 1, itemname: 'WUE Trucker Hat - Explore The Outdoors', description:'. Long lasting hats to wear on you next great outdoors adventure or everyday. Outdoors hats for the next hiking, biking, climbing, camping trip', quantity:8},
 
  ]);
 };
