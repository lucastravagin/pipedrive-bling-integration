'use strict'

const _server = require('./server/server')
const server = new _server.Server()

server.bootstrap([
  
]).then(server => {
    console.log('Server listening in port:', server.application.address())
}).catch(error => {
    console.log('Failed in initialize server')
    console.error(error)
    process.exit(1) //Uncaught Fatal Exception
})

/**
 * Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.
 */