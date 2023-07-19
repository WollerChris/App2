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
    const quantitystrng = req.body.quantity
    const quantity = parseInt(quantitystrng)
    // const quantity = req.body.quantity


    const createitem = {userid: userid, itemname: itemname, description: description, quantity: quantity}

    console.log(`item create ${createitem}`)
    const UserAdded = await knex('inventory_table')
        .insert(createitem)
        .returning('*')
        res.status(200).json(UserAdded)
})

app.put('/updateitem', async (req, res) => {
    const id = req.body.id
    const useridstrng = req.body.userid
    const userid = parseInt(useridstrng)
    const itemname = req.body.itemname
    const description = req.body.description
    const quantitystrng = req.body.quantity
    const quantity = parseInt(quantitystrng)
    console.log(id, userid, itemname, description, quantity)
    const UserUpdated = await knex('inventory_table')
        .where({id: id})
        .update({userid: userid, itemname: itemname, description: description, quantity: quantity})
        .returning('*')
        res.status(200).json(UserUpdated)
})

app.delete('/deleteitem', async (req, res) => {
    const id = req.body.id
    console.log(id)
    const UserDelete = await knex('inventory_table')
        .where({id: id})
        .del()
        .returning('*')
        res.status(200).json(UserDelete)
})

app.listen(port, () => { console.log(`Server running at ${port}.  Let's see some queries!`)})