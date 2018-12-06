const mongoose = require('mongoose')

let CharitySchema = mongoose.Schema({
    name: String,
    description: String,
    ratings: Number
})

module.exports = mongoose.model('Charity', CharitySchema)