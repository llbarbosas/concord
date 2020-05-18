const { v4: uuid } = require('uuid')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ChatController {
    constructor() {

    }

    async getAll(req, res) {
        try {
            const chats = await prisma.chatserver.findMany()

            res.send({ chats })
        } catch (error) {
            res.status(400).send({ error })
        }

    }

    async create(req, res) {
        const chat = await prisma.chatserver.create({
            data: {
                id: uuid(),
                name: "Facul"
            }
        })

        res.send({ chat })
    }

    join(req, res) {
        res.send({ message: 'chat.join' })
    }
}

module.exports = new ChatController()