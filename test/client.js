const socketIo = require('socket.io-client')
const chalk = require('chalk')
const emoji = require('node-emoji')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(chalk`{grey Enter your username: }`, name => {
    readline.question(chalk`{grey Enter chat url (ip:port): }`, chatUrl => {
        const socket = socketIo(`http://${chatUrl}`, { query: `name=${name}&color=white` })

        console.log(emoji.emojify(chalk`{grey :rocket: Connecting to ${chatUrl}}`))

        socket.on('connect', () => console.log(emoji.emojify(chalk`{grey :heavy_check_mark: Connected sucessfully}`)))
        socket.on('connect_error', err => console.log(emoji.emojify(chalk`{grey :x: Connection error: ${err}}`)))
        socket.on('reconnecting', attemptNumber => console.log(emoji.emojify(chalk`{grey :warning: Reconnecting...}`)))

        socket.on('message', message => console.log(message))
        socket.on('direct_message', message => console.log(message))

        getTextInput()

        function getTextInput() {
            readline.question('', text => {

                socket.emit('message', text)

                getTextInput()
            })
        }
    })
})