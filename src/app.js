const express = require(`express`);
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"]);
var cors = require('cors');
const { parseInt } = require('lodash');

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

app.post('/addItem', async (req, res) => {
    // const userid = req.body.userid
    const useridstrng = req.body.userid
    const userid = parseInt(useridstrng)
    const itemname = req.body.itemname
    const description = req.body.description
    // const quantity = req.body.quantity
    const quantitystrng = req.body.quantity
    const quantity = parseInt(quantitystrng)

    // {numUserId, itemname, description, numQuantity}

    const createitem = {userid: userid, itemname: itemname, description: description, quantity: quantity}
    // const createUser={update}
    console.log(`item create ${createitem}`)
    const UserAdded = await knex('inventory_table')
        .insert(createitem)
        .returning('*')
        res.status(200).json(UserAdded)
})


app.listen(port, () => { console.log(`Server running at ${port}.  Let's see some queries!`)})