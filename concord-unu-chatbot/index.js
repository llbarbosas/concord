require('dotenv').config()

const {
    CHAT_PORT = 3000,
    CHAT_HOST = 'localhost'
} = process.env

const express = require('express')
const app = express()

const bot = require('./bot')

app.use('/', bot)

app.listen(CHAT_PORT, () => {
    console.log(`listening on ${CHAT_HOST}:${CHAT_PORT}`)
})