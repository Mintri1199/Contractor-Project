const app = require('express')()

// Charity Navigator API
const CharityNavigator = require('charitynavigator-promise')
const charityNavigator = new CharityNavigator(process.env.APPID, process.env.APIKEY)
// Models
const Donation = require('../models/donation')

//Index all the charities
app.get('/', (req, res) => {
    charityNavigator.orgs({rated: true})
    .then((charities) => {
        res.render('charity-index', {charities: charities})
    }).catch((err) => {
        console.log(err.message)
    })
})

// Show one charity profile
app.get('/charities/:ein', (req, res) => {
    charityNavigator.orgsEin(req.params.ein)
    .then((charity) => {
        Donation.find({charityId: req.params.ein}).then((donations) =>{
            res.render('charity-show', {charity: charity, donations: donations})    
        }).catch((err) => {
            console.log(err.message);
        })
    }).catch((err) => {
        console.log(err.message);
    })
    
})


module.exports = app