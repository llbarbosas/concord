const {
    CHAT_PORT = 3000,
    CHAT_HOST = 'localhost'
} = process.env
const CHAT_URL = `http://${CHAT_HOST}:${CHAT_PORT}`

const emoji = require('node-emoji')
const { message } = require('./styles')

const bots = require('./bots')
const connectedBots = {}

const commands = [
    {
        name: 'COFFEE',
        pattern: /cafe/,
        on: (player, patternArgs) => {
            const { name } = player

            return message.server(`${name} tomou ${emoji.get('coffee')}`)
        }
    },
    {
        name: 'FIREWORKS',
        pattern: /fogos/,
        on: (player, patternArgs) => {
            const { name } = player

            return message.server(`${name} soltou ${emoji.emojify(':fireworks:'.repeat(3))}`)
        }
    },
    {
        name: 'BOT_EDIT',
        pattern: /bot (add|remove) (\w+)/,
        on: (player, patternArgs) => {
            const { name } = player
            const [addOrRemove, botname] = patternArgs

            const botExists = Object.keys(bots).includes(botname)

            if (botExists) {
                const botIsConnected = Object.keys(connectedBots).includes(botname)
                const isAdd = addOrRemove === 'add'

                if (isAdd && botIsConnected) {
                    throw Error(`O bot ${botname} já foi adicionado`)
                }

                if (!isAdd && !botIsConnected) {
                    throw Error(`O bot ${botname} não está adicionado`)
                }

                if (isAdd) {
                    const bot = bots[botname](CHAT_URL)
                    connectedBots[botname] = bot

                    return message.server(emoji.emojify(`${name} adicionou ${botname} :robot_face:`))
                } else {
                    connectedBots[botname].disconnect()
                    delete connectedBots[botname]

                    return message.server(emoji.emojify(`${name} removeu ${botname} :robot_face:`))
                }


            } else {
                throw Error(`O bot ${botname} não existe`)
            }
        }
    },
    {
        name: 'UNUBOT',
        pattern: /unubot (.+)/,
        on: (player, patternArgs) => {
            const [command] = patternArgs

            if (!connectedBots['unubot']) {
                throw Error(`O bot unubot não foi adicionado. Você pode adiciona-lo usando /bot add unubot`)
            }

            connectedBots['unubot'].command(player, command)
        },
    }
]

module.exports = commands