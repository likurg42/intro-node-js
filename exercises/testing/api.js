const express = require('express')
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')
const users = require('./users')
const app = express()

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/', async (req, res) => {
    res.status(200);
    res.write('Hello');
    res.end();
})

app.get('/user/:id', async (req, res) => {
    try {
        const id = await req.params.id
        // should ge user by given id in route param
        const user = await users.findUser(id)
        res.status(200)
        res.send(user)
    } catch (err) {
        console.error(err);
    }

})

app.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        await users.deleteUser(id)
        console.log(id);
        res.status(201)
        res.send({ id })
    } catch (err) {
        console.error(err)
    }
})

module.exports = app
