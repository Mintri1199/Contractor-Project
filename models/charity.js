const mongoose = require('mongoose')

var CharitySchema = mongoose.Schema({
    name: String,
    description: String,
    ratings: Number
})

module.exports = mongoose.model('Charity', CharitySchema)