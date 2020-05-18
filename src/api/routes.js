const router = require('express').Router()

const UserController = require('./controllers/UserController')
const ChatController = require('./controllers/ChatController')

router.get('/', (req, res) => {
    res.send({
        name: 'Concord API',
        description: 'Hello!'
    })
})

router.get('/login', UserController.auth)
router.get('/register', UserController.create)

router.get('/chat', ChatController.getAll)
router.get('/chat/create/:id', ChatController.create)
router.get('/chat/join/:id', ChatController.join)

module.exports = router