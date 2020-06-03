require('dotenv').config()

const app = require('./app')
const server = require('http').createServer(app)

app.use('/peer', require('./peer')(server))

server.listen(process.env.API_PORT, () => {
    console.log(`listening on port ${process.env.API_PORT}`)
})