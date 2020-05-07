'use strict'

const events = require('events')
const restifyErrors = require('restify-errors')

class Router extends events.EventEmitter {

    /**
     * 
     * script that performs or renders requests, creating a single 
     * responsibility, producing or requesting and responding to 
     * requests in a pattern.
     */

    envolope(document) {
        return document;
    }

    envelopeAll(documents, options = {}) {
        return documents
    }


    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(this.envolope(document))
            }
            else {
                throw new restifyErrors.NotFoundError('Document not Found')
            }
            return next(false)
        }
    }

    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document)
                    array[index] = this.envolope(document)
                })
                response.json(this.envelopeAll(documents, options))
            } else {
                response.json(this.envelopeAll([]))
            }
            return next(false)
        }
    }
}

exports.Router = Router