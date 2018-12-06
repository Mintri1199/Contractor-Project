const mongoose = require('mongoose')

let dontationSchema = mongoose.Schema({
    name: String,
    message: String,
    donationAmount: Number,
    
    charityId: {type: String, required: true}
})

module.exports = mongoose.model("Donation" , dontationSchema)