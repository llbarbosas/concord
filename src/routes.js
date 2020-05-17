const router = require('express').Router()

router.get('/', (req, res) => {
    res.send({ message: 'Hello world!' })
})

module.exports = router