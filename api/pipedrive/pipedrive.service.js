const axios = require('axios')
const environment = require('../../common/environment')

exports.urlPipedrive = axios.create({
  baseURL: environment.environment.urlPipedrive
})
