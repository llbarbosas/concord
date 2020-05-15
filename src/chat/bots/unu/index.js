const emoji = require('node-emoji')
const chalk = require('chalk')
const createUnuGame = require('./game')

module.exports = chatUrl => {
    const game = createUnuGame()

    const socket = require('socket.io-client')(chatUrl, { query: 'name=unubot&color=blue' })

    socket.emit('message', 'Olá pessoal! Vamos jogar unu?!')
    socket.emit('message', 'Quem quiser participar, digite /unubot jogar')
    socket.emit('message', 'Quando estiverem prontos, digitem /unubot comecar')

    game.onStateChange(state => console.log(state))

    socket.on('message', message => {
        if (!message.includes('[Chat]') && !message.includes('[unubot]') && message.includes('unubot')) {
            socket.emit('message', emoji.emojify('Tem alguem falando de mim aí? :eyes:'))
        }
    })

    return {
        command(player, commandInput) {
            const [command, ...args] = commandInput.split(' ')

            const availableCommands = {
                jogar() {
                    socket.emit('message', `Uhul! O ${player.name} vai jogar!`)
                    game.entrar({ id: player.id, name: player.name })
                },
                comecar() {
                    const card = game.ultimaCarta()
                    const { players, decks } = game.getState()

                    socket.emit('message', `O jogo começou! A carta atual é um ${cardStyle(card)}`)

                    players.forEach(({ id, name }) => {
                        socket.emit('direct_message', { id, message: `${name}, suas cartas são: ${decks[id].map(cardStyle)}` })
                    })

                    game.comecar()
                },
                embaralhar() {
                    socket.emit('message', `${player.name} está embaralhando as cartas`)
                    game.embaralhar()
                },
                distribuir() {
                    socket.emit('message', `${player.name} está distribuindo as cartas`)
                    game.distribuir()
                },
                comprar() {
                    socket.emit('message', `${player.name} compra uma carta`)
                    game.comprarCarta({ id: player.id, name: player.name })
                },
                passar() {
                    socket.emit('message', `${player.name} passou a vez`)
                    game.proximoJogador()
                },
                carta() {
                    socket.emit('message', `${player.name} está jogando sua carta`)
                    game.jogarCarta(player.id, args[0])

                    socket.emit('message', `Lucas jogou um ${cardStyle(game.ultimaCarta())}`)
                    socket.emit('message', `Agora é a vez do ${game.jogadorAtual()}`)
                }
            }

            if (availableCommands[command]) {
                try {
                    availableCommands[command]()
                } catch (err) {
                    socket.emit('message', `Erro: ${err.message}`)
                }

            } else {
                socket.emit('message', `Vish, não conheço o comando /${command}, ${player.name}`)
            }

            function cardStyle(card) {
                const chalkColorsMap = {
                    'RED': 'bgRed', 'YELLOW': 'bgYellow', 'BLUE': 'bgBlue',
                    'GREEN': 'bgGreen', 'WILD': 'bgGrey'
                }

                return chalk`{black {${chalkColorsMap[card.color]}  ${card.symbol} }}`
            }
        },
        disconnect() {
            socket.disconnect()
        }
    }
}