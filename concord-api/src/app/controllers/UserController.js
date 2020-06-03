const { v4: uuid } = require('uuid')
const prisma = require('../db')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    async create(req, res) {
        const { email, name, password, username } = req.body

        try {
            const user = await prisma.user.create({
                data: {
                    id: uuid(),
                    name: name,
                    password: await bcrypt.hash(password, 8),
                    username: username,
                    email: email
                }
            })

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })

            // TODO: Send e-mail with this link
            const link = `http://localhost:${process.env.API_PORT}/api/verify-email?token=${token}`

            res.send({ user, link })
        } catch (error) {
            console.log(error)
            res.status(400).send({ error })
        }

    }

    async verifyEmail(req, res) {
        const { token } = req.query

        try {
            const { email } = jwt.verify(token, process.env.JWT_SECRET)

            const user = await prisma.user.update({
                where: { email },
                data: { emailVerified: true }
            })

            if (!user) {
                throw new Error('Unknown e-mail')
            }

            res.redirect(`http://${process.env.WEB_DASHBOARD_URL}`)
        } catch (error) {
            res.status(400).send({ error })
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        try {
            const user = await prisma.user.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw { email: 'Esse e-mail não existe' }
            }

            if (!user.emailVerified) {
                throw { email: 'Verifique seu e-mail' }
            }

            const compare = await bcrypt.compare(password, user.password)

            if (!compare) {
                throw { password: 'A senha não coincide' }
            }

            const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' })

            res.send({ user, token })

        } catch (error) {
            console.log(error)
            res.status(400).send({ error })
        }
    }
}

module.exports = new UserController()