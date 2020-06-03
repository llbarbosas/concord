const { v4: uuid } = require('uuid')
const prisma = require('../db')

class ChatController {
    async getAll(req, res) {
        res.send({ message: 'chat.getAll' })
    }

    async create(req, res) {
        res.send({ message: 'chat.create' })
    }

    async join(req, res) {
        res.send({ message: 'chat.join' })
    }
}

module.exports = new ChatController()