const Donation = require('../models/donation')
const app =  require('express')()

app.get("/", (req, res) => {
    Donation.find()
    .then( donation => {
        res.render('home', {donation: donation})
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

// Deleting the donation
app.delete("/donations/:id", (req,res) => {
    console.log("DELETE donation");
    Donation.findByIdAndDelete(req.params.id)
    .then((donation) => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err.message);
    })
})



module.exports = app

