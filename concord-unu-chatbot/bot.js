const router = require('express').Router()

// Enabling interactions with bots https://api.slack.com/bot-users 
router.post('/', (req, res) => {
    const payload = req.body
    const { event } = payload

    if (event.type === 'message') {
        // chat.postMessage('Hello world!')
    }

    res.status(200).send('OK')
})

module.exports = router