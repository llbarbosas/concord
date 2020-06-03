const actionTypes = {
    ENTRAR: 'ENTRAR',
    COMECAR: 'COMECAR',
    EMBARALHAR: 'EMBARALHAR',
    DISTRIBUIR: 'DISTRIBUIR',
    JOGAR_CARTA: 'JOGAR_CARTA',
    COMPRAR_CARTA: 'COMPRAR_CARTA',
    PROXIMO_JOGADOR: 'PROXIMO_JOGADOR',
}

const actionCreators = {
    entrar(player) {
        return { type: actionTypes.ENTRAR, player }
    },
    comecar() {
        return { type: actionTypes.COMECAR }
    },
    embaralhar() {
        return { type: actionTypes.EMBARALHAR }
    },
    distribuir() {
        return { type: actionTypes.DISTRIBUIR }
    },
    comprarCarta(playerId) {
        return { type: actionTypes.COMPRAR_CARTA, playerId }
    },
    proximoJogador() {
        return { type: actionTypes.PROXIMO_JOGADOR }
    },
    jogarCarta(playerId, cardId) {
        return { type: actionTypes.JOGAR_CARTA, playerId, cardId: cardId - 1 }
    }
}

module.exports = { ...actionTypes, ...actionCreators }