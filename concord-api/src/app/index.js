const express = require('express')
const app = express()

app.use(express.json())
app.use(require('cors')())

app.use('/api', require('./routes'))

module.exports = app