require('dotenv').config()

const {
    CHAT_PORT = 3000,
    CHAT_HOST = 'localhost'
} = process.env

const express = require('express')
const app = express()
const server = require('http').createServer(app)

const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
    debug: true
})

const chatServer = require('./chat')
const chat = chatServer(server)

const routes = require('./api/routes')

app.use(express.json())

app.use('/api', routes)

app.use('/peerjs', peerServer)

server.listen(CHAT_PORT, () => {
    console.log(`listening on ${CHAT_HOST}:${CHAT_PORT}`)
})