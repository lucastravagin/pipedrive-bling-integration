'use strict'

const restify = require('restify')
const environment = require('../common/environment')
const mongoose = require('mongoose')
const errorHandler = require('./error.handler')

const corsMiddleware = require('restify-cors-middleware')

class Server {

    initializeDB() {
        mongoose.Promise = global.Promise
        mongoose.set('useCreateIndex', true)
        return mongoose.connect(environment.environment.db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    initRoutes(routers) {

        return new Promise((resolve, reject) => {
            try {
                //Restify Plugin Configuration
                this.application = restify.createServer({
                    name: 'Pipedrive and Bling integration',
                    version: '1.0.0'
                })

                this.application.get('/', [
                    (req, resp, next) => {
                        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                            let error = new Error()
                            error.statusCode = 400
                            error.message = 'Please, update your browser'
                            return next(error)
                        }
                        return next()
                    }, (req, resp, next) => {
                        resp.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query,
                            timeout: req.connection.timeout,
                            DateRequest: req._date.toISOString().substr(0, 10).split('-').reverse().join('/'),
                            HourRequest: req._date.toLocaleTimeString('pt-BR'),
                            serverName: req.serverName,
                            ipclient: req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
                        })
                        return next()
                    }])

                const corsOptions = corsMiddleware.Options = {
                    preflightMaxAge: 10,
                    origins: ['*']
                }

                const cors = corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions)
                this.application.pre(cors.preflight)

                /*
               * Analyzes the bodies of requests received in middleware before their handlers 
               */
                this.application.use(cors.actual)
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())

                this.application.listen(environment.environment.server.port, () => {
                    resolve(this.application)
                })

                /*
                * Middleware responsible for registering handle errors (Mongo and Validation Error)
                */
                this.application.on('restifyError', errorHandler.handleError)

                /**
                 * Cycles through the Routers array by adding routes
                 * ]*/ 
                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

            } catch (error) {
                reject(error)
            }
        })
    }
}

exports.Server = Server