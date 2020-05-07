'use strict'

const _server = require('./server/server')
const server = new _server.Server()
//const pipedriveRouter = require('./api/pipedrive/pipedrive.router')

const blingRouter = require('./api/bling/bling.router')

server.bootstrap([
  blingRouter.blingRouter
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