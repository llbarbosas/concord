const router = require('express').Router()

const UserController = require('./controllers/UserController')
const ChatController = require('./controllers/ChatController')

const authMiddleware = require('./middlewares/auth')

router.get('/', (req, res) => {
    res.send({
        name: 'Concord API',
        description: 'Hello!'
    })
})

router.post('/login', UserController.login)
router.post('/register', UserController.create)
router.get('/verify-email', UserController.verifyEmail)

router.get('/chat', authMiddleware, ChatController.getAll)
router.get('/chat/create/:id', authMiddleware, ChatController.create)
router.get('/chat/join/:id', authMiddleware, ChatController.join)

module.exports = router