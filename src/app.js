const express = require(`express`);
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"]);
var cors = require('cors')

app.use(express.json())
app.use(cors())

		
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

app.post('/createaccount', async (req, res) => {
    // const update = req.body
    const fname = req.body.fname
    const lname = req.body.lname
    const username = req.body.username
    const password = req.body.password

    const createUser = {fname: fname, lname: lname, username: username, password: password}
    // const createUser={update}
    const UserAdded = await knex('user_table')
        .insert(createUser)
        .returning('*')
        res.status(200).json(UserAdded)
})

app.listen(port, () => { console.log(`Server running at ${port}.  Let's see some queries!`)})