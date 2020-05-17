require('dotenv').config()

const {
    CHAT_PORT = 3000,
    CHAT_HOST = 'localhost'
} = process.env

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const chatServer = require('./chat')
const routes = require('./routes')

app.use(express.json())

app.use('/api', routes)

const chat = chatServer(server)

server.listen(CHAT_PORT, () => {
    console.log(`listening on ${CHAT_HOST}:${CHAT_PORT}`)
})