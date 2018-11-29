// Initials
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
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
// override with post having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
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

// New
app.get("/donations/new", (req, res) => {
    res.render('donation-new')
})

//Create
app.post("/donations" , (req, res) => {
    Donation.create(req.body).then((donation) => {
        console.log(req.body);
        res.redirect(`/donations/${donation._id}`); // redirect to the newly created donation
    }).catch((err) => {
        console.log(err.message);
    })
})

// Show the donation
app.get('/donations/:id', (req, res) => {
    Donation.findById(req.params.id).then((donation) => {
        res.render('donation-show', {donation: donation})
    }).catch((err) => {
        console.log(err.message);
    })
})

// Edit the donation (message only)
app.get('/donations/:id/edit', (req, res) => {
    Donation.findById(req.params.id, function(err, donation) {
        res.render('donation-edit', {donation: donation})
    }).catch((err) => {
        console.log(err.message);
    })
})

// Update the donation's message
app.put('/donations/:id', (req, res) =>{
    Donation.findByIdAndUpdate(req.params.id, req.body)
    .then(donation => {
        res.redirect(`/donations/${donation._id}`)
    }).catch(err => {
        console.log(err.message);
    })
})

// Telling the server to connect to port 3000
app.listen(3000, () =>{
    console.log('App listening on port 3000!');
})

module.exports = app 