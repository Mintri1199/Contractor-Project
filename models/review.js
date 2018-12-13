const mongoose = require('mongoose')

let reviewSchema = mongoose.Schema({
    name: String,
    review: String,
    rating: Number,
    charityId: {type: String , required: true}
})

module.exports = mongoose.model("Review", reviewSchema)