// Initials
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
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
const Donation = require("./models/donation")

// Middlewares
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }));
//mongoose.connect(mongoUri, {useNewUrlParser: true } )



// Routes
// Index
app.get('/', (req, res) => {
    Donation.find()
    .then( donation => {
        res.render('home', {donation: donation})
    }).catch((err) => {
        console.log(err.message);
    })
})

// Show
app.get("/donations/new", (req, res) => {
    res.render('donation-new')
})

//Create
app.post("/donations" , (req, res) => {
    
    Donation.create(req.body).then((donation) => {
        console.log(req.body);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
        
    })
})

// Telling the server to connect to port 3000
app.listen(3000, () =>{
    console.log('App listening on port 3000!');
})

module.exports = app 