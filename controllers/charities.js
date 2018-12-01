const app = require('express')()

// Charity Navigator API
const CharityNavigator = require('charitynavigator-promise')
const appid = '156b017b'
const appkey = '43106ae04d2560476043fef79ad879cb'
const charityNavigator = new CharityNavigator(appid, appkey)


app.get('/', (req, res) => {
    charityNavigator.orgs()
    .then((charities) => {
        res.render('charity-index', {charities: charities}) 
    })
})


module.exports = app