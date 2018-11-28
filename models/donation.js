const mongoose = require('mongoose')

var dontationSchema = mongoose.Schema({
    name: String,
    message: String,
    donationAmount: Number
})

module.exports = mongoose.model("Donation" , dontationSchema)