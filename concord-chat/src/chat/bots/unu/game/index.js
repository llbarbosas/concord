const { createStore } = require('redux')
const actions = require('./actions')

const colors = {
    BLUE: 'BLUE',
    RED: 'RED',
    YELLOW: 'YELLOW',
    GREEN: 'GREEN',
    WILD: 'WILD'
}

const initialState = {
    gameMode: 'waiting', // 'waiting' | 'running' | 'finished'
    directionIsClockwise: true, // isClockwise
    nextPlayer: 0,
    players: [], // { id, name }[]
    decks: {
        draw: [],
        discard: makeGameDeck()
    }
}

/*
 * Atualiza o estado do jogo
 */
function gameReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.ENTRAR:
            return { ...state, players: [...state.players, action.player] }
        case actions.COMECAR:
            return { ...state, gameMode: 'running' }
        case actions.EMBARALHAR:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    discard: shuffleArray(state.decks.discard),
                    draw: shuffleArray(state.decks.draw)
                }
            }
        case actions.DISTRIBUIR:
            const numberCards = 7

            const decks = state.players.reduce((acc, player, index) => {
                return { ...acc, [player.id]: state.decks.discard.slice(index * numberCards, (index + 1) * numberCards) }
            }, {})

            const lastCardIndex = state.players.length * numberCards

            const draw = state.decks.discard.slice(lastCardIndex, state.decks.discard.length - 1)

            const discard = state.decks.discard.slice(state.decks.discard.length - 1, state.decks.discard.length)

            return { ...state, gameMode: 'running', decks: { ...decks, discard, draw } }
        case actions.JOGAR_CARTA:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    discard: [
                        ...state.decks.discard,
                        state.decks[action.playerId][action.cardId]
                    ],
                    [action.playerId]: state.decks[action.playerId].filter((_, index) => index !== action.cardId)
                }
            }
        case actions.COMPRAR_CARTA:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    draw: state.decks.draw.slice(1),
                    [action.playerId]: [...state.decks[action.playerId], state.decks.draw[0]]
                }
            }
        case actions.PROXIMO_JOGADOR:
            return {
                ...state,
                nextPlayer: nextValidIndex(state.players, state.nextPlayer)
            }
        default:
            return state
    }
}

/*
 * Controla as regras de negócio do jogo
 */
function gameController(gameStore) {
    return {
        entrar: player => {
            if (gameStore.getState().players.includes(player)) {
                throw Error('O jogador já existe')
            }

            if (gameStore.getState().gameMode !== 'waiting') {
                throw Error('O jogo já começou')
            }

            return gameStore.dispatch(actions.entrar(player))
        },

        comecar: () => gameStore.dispatch(actions.comecar()),

        embaralhar: () => gameStore.dispatch(actions.embaralhar()),

        distribuir: () => {
            if (gameStore.getState().gameMode !== 'waiting')
                throw Error('O jogo está em andamento')

            return gameStore.dispatch(actions.distribuir())
        },

        comprarCarta: player => {
            const { decks, nextPlayer: nextPlayerIndex, players } = gameStore.getState()
            const { draw: drawDeck } = decks

            if (drawDeck.length == 0)
                gameStore.dispatch(actions.embaralhar())

            if (player !== players[nextPlayerIndex])
                throw Error('Não é sua vez de jogar!')

            return gameStore.dispatch(actions.comprarCarta(player))
        },

        jogarCarta: (playerId, cardId) => {
            const { nextPlayer: nextPlayerIndex, players, decks } = gameStore.getState()
            const { discard: discardDeck, [playerId]: playerDeck } = decks
            const lastCard = discardDeck[discardDeck.length - 1]
            const card = playerDeck[cardId]

            if (!card)
                throw Error('Carta inválida')

            if (nextPlayerIndex === -1)
                throw Error('Calma! O jogo ainda não começou')

            if (playerId !== players[nextPlayerIndex].id)
                throw Error('Ainda não é sua vez de jogar')

            if (lastCard.color !== card.color
                && lastCard.symbol !== card.symbol
                && card.color !== colors.WILD)
                throw Error('Essa carta não combina com a ultima jogada')

            gameStore.dispatch(actions.proximoJogador())

            return gameStore.dispatch(actions.comprarCarta(playerId))
        },

        proximoJogador: () => gameStore.dispatch(actions.proximoJogador()),

        ultimaCarta: () => {
            const { discard: discardDeck } = gameStore.getState().decks

            return discardDeck[discardDeck.length - 1]
        },

        jogadorAtual: () => {
            const { players, nextPlayer } = gameStore.getState()

            return players[nextPlayer].name
        },

        onStateChange: callback => gameStore.subscribe(() => callback(gameStore.getState())),

        getState: () => gameStore.getState()
    }
}


function makeGameDeck() {
    const { WILD, ...normalColors } = colors

    const normalCards = Object.keys(normalColors)
        .reduce((cards, color) => {
            const numeric = range(10).map(i => ({ symbol: i, color }))
            const special = [
                { symbol: '+2', color },
                { symbol: 'Pular', color },
                { symbol: 'Inverter', color },
            ]

            return [...cards, ...numeric, ...special, ...special]
        }, [])

    const wildCards = [
        { symbol: 'Curinga', color: WILD },
        { symbol: '+4', color: WILD },
    ]

    return [...normalCards, ...wildCards, ...wildCards]
}

function range(n) {
    return [...Array(n).keys()]
}

function nextValidIndex(array, currentIndex) {
    return (currentIndex + 1) % array.length
}

function shuffleArray(array) {
    const arr = [...array]

    arr.forEach((_, i) => {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    })

    return arr
}

function createGame() {
    const store = createStore(gameReducer)

    return gameController(store)
}

module.exports = createGame