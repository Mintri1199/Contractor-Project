// Initials
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const path = require('path')
var exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main',
    extname: 'hbs'
})

// Model
const Charity = require('./models/charity')
const Donation = require("./models/donation")

// Controllers
const donations = require('./controllers/donations');

// Mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Relearning-Back-End')

// Handlebars
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')

// Middleware
app.use(methodOverride('_method')) // Override with POST having ?_method
app.use(bodyParser.urlencoded({ extended: true }));


// Access controllers
app.use(donations)

// Telling the server to connect to port 3000
app.listen(3000, () => {
    console.log('App listening on port 3000!');
})

//mongoose.connect(mongoUri, {useNewUrlParser: true } )

module.exports = app;