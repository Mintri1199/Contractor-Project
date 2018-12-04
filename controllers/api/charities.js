const app = require('express')()
const Donations = require('../../models/donation')

// Charity Navigator API
const CharityNavigator = require('charitynavigator-promise')
const appid = '156b017b'
const appkey = '43106ae04d2560476043fef79ad879cb'
const charityNavigator = new CharityNavigator(appid, appkey)

// Index all the charities
app.get('/api/charities', (req, res) => {
    charityNavigator.orgs({rated: true})
    .then((charities) => {        
        return res.send({charities: charities})
    }).catch((err) => {
        console.log(err.message)
    })
})

app.get("/api/donations", (req, res) => {
    Donations.find({})
    .then((donations) => {
        return res.send({donations: donations})
    }).catch((err) => {
        console.log(err.message);
    })
})

module.exports = app 