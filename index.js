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
//const donations = require('./controllers/donations');
const charities = require('./controllers/charities')

// Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Relearning-Back-End')

// Handlebars
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')

// Middleware
app.use(methodOverride('_method')) // Override with POST having ?_method
app.use(bodyParser.urlencoded({ extended: true }));

// Access controllers
//app.use(donations)
app.use(charities)


// Telling the server to connect to port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log('server listening on port %d in %s mode', this.address().port, app.settings.env);
    
})



module.exports = app;