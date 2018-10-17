const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express() 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const router = express.Router()
const routes = require('./routes/index.js')
app.use('/api/v1', routes(router))

const environment = process.env.NODE_ENV
const stage = require('./config')[environment]
if (environment !== 'production') {
    app.use(logger('dev'))
}

app.listen(`${stage.port}`, () => {
    console.log(`Server listening at localhost:${stage.port}`)
})
module.exports = app
