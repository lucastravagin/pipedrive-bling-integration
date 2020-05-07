const blingModel = require('../bling/bling.model')
const modelRouter = require('../../common/model.router')


class BlingRouter extends modelRouter.ModelRouter {
    constructor() {
        super(blingModel.OrderBling)
    }

    /**
     * 
     * /orderblings
     */
    applyRoutes(application) {
        application.get(`${this.basePath}`, [this.findAll])
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    }
}

exports.blingRouter = new BlingRouter()