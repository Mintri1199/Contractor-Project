const app = require('express')()

// Charity Navigator API
const CharityNavigator = require('charitynavigator-promise')
const charityNavigator = new CharityNavigator(process.env.APPID, process.env.APIKEY)
// Models
const Donation = require('../models/donation')
const Reviews = require('../models/review')

//Index all the charities
app.get('/', (req, res) => {
    charityNavigator.orgs({rated: true})
    .then((charities) => {
        res.render('charity/charity-index', {charities: charities})
    }).catch((err) => {
        console.log(err.message)
    })
})

// Show one charity profile
app.get('/charities/:ein', (req, res) => {
    charityNavigator.orgsEin(req.params.ein).then((charity) => {
        Reviews.find({charityId: req.params.ein}).then((reviews) => {
            res.render('charity/charity-show' ,{charity: charity, reviews: reviews})
        })
    }).catch((err) => {
        console.log(err.message);
    })
})


module.exports = app