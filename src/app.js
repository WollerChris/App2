const express = require(`express`);
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"]);
var cors = require('cors')
		
app.get('/', (req, res) => {res.send('Application up and running!')})

app.get('/userlist', cors(), (req, res) => {
    knex('user_table')
        .select('*')
        .then(result => {
            var users = result.map(person => person)
            res.json(users);
        })
})

app.get('/items', cors(), (req, res) => {
    knex('inventory_table')
        .select('*')
        .then(result => {
            var inventory = result.map(item => item)
            res.json(inventory);
        })
})

app.listen(port, () => { console.log(`Server running at ${port}.  Let's see some queries!`)})