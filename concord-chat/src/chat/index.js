const socketIo = require('socket.io')
const commands = require('./commands')

const { message: messageStyle, colors: CHAT_COLORS } = require('./styles')

function chatServer(httpServer) {
    const io = socketIo(httpServer)
    const users = {}

    io.use((socket, next) => {
        const id = socket.id
        const { name = id, color = 'white' } = socket.request._query

        createUser(id, { name, color })

        next()

        function createUser(id, opts) {
            const { name: desiredName, color: desiredColor } = opts

            const color = CHAT_COLORS.includes(desiredColor) ? desiredColor : CHAT_COLORS[0]

            const equalNames = countEqualNames()

            const name = `${desiredName}${equalNames > 0 ? equalNames : ''}`

            users[id] = { id, name, color }

            socket.broadcast.emit('message', messageStyle.server(`${name} se juntou ao chat`))
            socket.emit('message', messageStyle.server(`Bem vindo ${name}!`))

            const numberConnectedUsers = Object.values(users).length

            socket.emit('message', messageStyle.server(`${numberConnectedUsers} usuário(s) conectado(s)`))

            function countEqualNames() {
                return Object.values(users)
                    .reduce((count, user) => {
                        if (user.name == desiredName) {
                            return ++count
                        }
                    }, 0)
            }
        }
    })

    io.on('connection', socket => {
        socket.on('message', message => handleMessage(message))
        socket.on('direct_message', ({ message, id }) => handleDirectMessage(message, id))
        socket.on('disconnect', () => disconnectUser())

        function handleMessage(message) {
            const isCommand = message[0] == '/'

            if (isCommand) {
                handleCommand(message, users[socket.id], (err, response) => {
                    if (err) {
                        return socket.emit('message', messageStyle.server(err))
                    }

                    if (response) {
                        return io.emit('message', response)
                    }
                })
            } else {
                socket.broadcast.emit('message', messageStyle.user(message, users[socket.id]))
            }
        }

        function handleCommand(message, user, callback) {
            const command = commands.find(({ pattern }) => pattern.test(message))

            if (command) {
                const { pattern } = command
                const patternArgs = message.match(pattern).slice(1)

                try {
                    return callback(undefined, command.on(user, patternArgs))
                } catch (err) {
                    return callback(err.message, undefined)
                }

            } else {
                return callback('Este comando não existe', undefined)
            }
        }

        function handleDirectMessage(message, id) {
            io.to(id).emit('direct_message', messageStyle.direct(message, users[socket.id]))
        }

        function disconnectUser() {
            const { name } = users[socket.id]

            socket.broadcast.emit('message', messageStyle.server(`${name} se desconectou do chat`))

            delete users[socket.id]
        }
    })

    return (req, res, next) => {
        res.send({ name: 'Concord Chat Server', status: 'running' })
    }
}

module.exports = chatServer