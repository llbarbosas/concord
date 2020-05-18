class UserController {
    constructor() {

    }

    create(req, res) {
        res.send({ message: 'Hello world!' })
    }

    auth(req, res) {
        res.send({ message: 'Hello world!' })
    }
}

module.exports = new UserController()