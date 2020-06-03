const chalk = require('chalk')
const emoji = require('node-emoji')

module.exports = {
    message: {
        server(text) {
            return chalk`{italic {blue [Chat]}: ${text}}`
        },
        user(text, user) {
            const { name, color } = user

            return chalk`{${color} [${name}]}: ${emoji.emojify(text)}`
        },
        direct(text, user) {
            const { name } = user

            return chalk`{italic {yellow [${name}]: ${text}}}`
        }
    },

    // chalk colors
    colors: [
        'white', 'black', 'red', 'green', 'yellow', 'blue', 'magenta',
        'cyan', 'grey', 'redBright', 'greenBright', 'yellowBright',
        'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'
    ]
}