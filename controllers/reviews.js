const Reviews =  require('../models/review')
const app = require('express')()

// index
app.get('/charities/:ein/reviews', (req, res) => {
    Reviews.find({charityId: req.params.ein}).then((reviews)=> {
        res.render('review/review-index', {reviews: reviews, charityId: req.params.ein})
    }).catch((err) => {
        console.log(err.message);
    })
})

// New
app.get('/charities/:ein/reviews/new', (req, res) => {
    Reviews.find({charityId: req.params.ein}).then( (charity) => {
        res.render('review/review-new', {charity, charityId: req.params.ein})
    }).catch((err) => { 
        console.log(err.message);
    })
})

// Create
app.post('/charities/:ein/reviews', (req, res) => {
    Reviews.create(req.body).then( (review) => {
        console.log('from review-new');
        // should redirect to reviews index
        res.redirect(`/charities/${req.params.ein}/reviews`)
    } )
})

// Show
app.get('/charities/:ein/reviews/:id', (req, res) => {
    Reviews.findById(req.params.id).then((review) => {
        res.render('review/review-show', {review: review})
    }).catch((err) => {
        console.log(err.message);
    })
})

// Edit the message of the review
app.get('/charities/:ein/reviews/:id/edit', (req, res) => {
    Reviews.findById(req.params.id, (err, review) => {
        res.render('review/review-edit', {review: review})
    }).catch((err) => {
        console.log(err.message);
    })
})

//Update
app.put('/charities/:ein/reviews/:id', (req, res) =>{
    Reviews.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        res.redirect(`/charities/${req.params.ein}/reviews/${req.params.id}`)
    }).catch(err => {
        console.log(err.message);
    })
})

// Delete
app.delete('/charities/:ein/reviews/:id' , (req, res) => {
    Reviews.findByIdAndDelete(req.params.id).then( review => {
        res.redirect(`/charities/${req.params.ein}/reviews`)
    }).catch((err) => {
        console.log(err.message);
    })
})


module.exports = app
