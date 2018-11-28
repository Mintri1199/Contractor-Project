const app = require('express')()


app.get('/', (req, res) => {
    res.render('home')
})


module.exports = app