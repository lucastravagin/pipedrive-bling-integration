'use strict'

const mongoose = require('mongoose')

const orderBling = new mongoose.Schema({

    customer: {type: String, required: true},
    title: {type: String, required: true},
    value: {type: Number, required: true},
    add_time: {type: Date, required: true},
    update_time: {type: Date, required: true}

})

exports.OrderBling = mongoose.model('OrderBling', orderBling)