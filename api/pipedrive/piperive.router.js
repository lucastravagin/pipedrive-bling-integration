'use strict'


const pipedriveHandler = require('./pipedrive.handler')

class PipedriveRouter  {
 
    applyRoutes(application) {
        application.get('/opportunities', pipedriveHandler.getOpportunitiesWon)
    }
    
}

exports.pipedriveRouter = new PipedriveRouter()