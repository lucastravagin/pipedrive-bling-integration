'use stricit'

const router = require('./router')
const mongoose = require('mongoose')
const restifyErrors = require('restify-errors')

class ModelRouter extends router.Router {
  constructor (model) {
    super()

    this.model = model

    /**
         * Method to validate if the Id arriving in the parameter is valid
         */
    this.validateId = (req, res, next) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(restifyErrors.NotFoundError('Document not found'))
      } else {
        next()
      }
    }

    /**
         * Generic method that fetches all documents in the Mongo
         */
    this.findAll = (req, res, next) => {
      this.model.find()
        .then(this.render(res, next))
        .catch(next)
    }

    /**
         * Generic method that searches documents by id
         */

    this.findById = (req, res, next) => {
      this.model.findById(req.params.id)
        .then(this.render(res, next))
        .catch(next)
    }

    this.basePath = `/${model.collection.name}`
  }
}

exports.ModelRouter = ModelRouter
