const { ExpressPeerServer } = require('peer')
const options = {
    debug: true
}

module.exports = server => ExpressPeerServer(server, options)