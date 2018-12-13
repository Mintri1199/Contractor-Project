const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
const Review = require('../models/review')
chai.use(chaiHttp);
const { mockData } = require('./test-charity')
const sampleReview = {
    "name": 'Jackson',
    "review": 'Good luck',
    "rating": 1,
    "charityId": `${mockData.ein}`
}


describe('Review', () => {

    // Test index
    it('should index all reviews on / GET', (done) => {
        chai.request(server).get(`/charities/${mockData.ein}s`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // Test new
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server).get(`/charities/${mockData.ein}/reviews/new`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // Test show
    it('should show a single reviews on /reviews/<id> get', (done) => {
        var review = new Review(sampleReview)
        review.save((err, data) => {
            chai.request(server)
            .get(`/charities/${mockData.ein}/reviews/${data._id}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })

    // Test edit
    it('should edit a single reviews\'s message on /reviews/<id>/edit GET', (done) => {
        var review = new Review(sampleReview)
        review.save((err, data) => {
            chai.request(server).get(`/charities/${mockData.ein}/reviews/${data._id}/edit`).end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })

    // Test create
    it('should create a SINGLE donation on /donations POST',  (done) => {
        chai.request(server)
        .post(`/charities/${mockData.ein}/reviews`)
        .send(sampleReview)
        .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // Test update
    it('should update a SINGLE donations on /donations/<id> PUT', (done) => {
        var review = new Review(sampleReview)
        review.save((err, data) => {
            chai.request(server).put(`/charities/${mockData.ein}/donations/${data._id}?_method=PUT`)
            .send({"review": "Updating the message"}).end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })

    // Test Delete
    it('should delete a SINGLE review on /reviews/<id> DELETE', (done) =>{
        var review = new Review(sampleReview)

        review.save((err, data) => {
            chai.request(server)
            .delete(`/charities/${mockData.ein}/donations/${sampleReview.charityId}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })
    
    after(() => {
        Review.deleteMany({'name': 'Jackson'}).exec((err, review) => {
            review.remove()
        })
    })
})