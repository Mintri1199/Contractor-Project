// Initials
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Relearning-Back-End')
const path = require('path')
var exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main',
    extname: 'hbs'
})

// Model
const Charity = require('./models/charity')


// Middlewares
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')



// Routes
// Index
app.get('/', (req, res) => {
    Charity.find()
    .then(charities => {
        res.render('home', {charities: charities})
    }).catch(err => {
        console.log(err.message);
    })
})

// Show




// Telling the server to connect to port 3000
app.listen(3000, () =>{
    console.log('App listening on port 3000!');
})

module.exports = app 