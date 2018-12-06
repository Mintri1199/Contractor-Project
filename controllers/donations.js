const Donation = require('../models/donation')
const app =  require('express')()

// New
app.get("/charities/:ein/donations/new", (req, res) => {
    Donation.find({charityId: req.params.ein}).then((charity) => {
        res.render('donation/donation-new', {charity, charityId: req.params.ein});
    }).catch((err) => {
        console.log(err.message);
    })
})

//Create
app.post("/charities/:ein/" , (req, res) => {
    Donation.create(req.body).then((donation) => {
        console.log(req.body);
        res.redirect(`/charities/${req.params.ein}`); // redirect to the newly created donation
    }).catch((err) => {
        console.log(err.message);
    })
})

// Show the donation
app.get('/charities/:ein/donations/:id', (req, res) => {
    Donation.findById(req.params.id).then((donation) => {
        res.render('donation/donation-show', {donation: donation})
    }).catch((err) => {
        console.log(err.message);
    })
})

// Edit the donation (message only)
app.get('/charities/:ein/donations/:id/edit', (req, res) => {
    Donation.findById(req.params.id, (err, donation) => {
        res.render('donation/donation-edit', {donation: donation})
    }).catch((err) => {
        console.log(err.message);
    })
})

// Update the donation's message
app.put('/charities/:ein/donations/:id', (req, res) =>{
    Donation.findByIdAndUpdate(req.params.id, req.body)
    .then(donation => {
        res.redirect(`/charities/${req.params.ein}/donations/${req.params.id}`)
    }).catch(err => {
        console.log(err.message);
    })
})

// Deleting the donation
app.delete("/charities/:ein/donations/:id", (req,res) => {
    console.log("DELETE donation");
    Donation.findByIdAndDelete(req.params.id)
    .then((donation) => {
        res.redirect(`/charities/${req.params.ein}`)
    }).catch((err) => {
        console.log(err.message);
    })
})



module.exports = app

