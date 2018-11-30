const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
const Donation = require('../models/donation')

chai.use(chaiHttp);

const sampleDonation = {
    'name': 'Jackson',
    'message': 'Good luck',
    'donationAmount': 123
}

describe('Donations', () => {

    // Test index
    it('should index all reviews on / GET', (done) => {
        chai.request(server).get('/').end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // Test new
    it('should display new form on /donations/new GET', (done) => {
        chai.request(server).get(`/donations/new`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // Test show
    it('should show a single donation on /donations/<id> get', (done) => {
        var donation = new Donation(sampleDonation)
        donation.save((err, data) => {
            chai.request(server)
            .get(`/donations/${data._id}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })

    // Test edit
    it('should edit a single Donation\'s message on /donations/<id>/edit GET', (done) => {
        var donation = new Donation(sampleDonation)
        donation.save((err, data) => {
            chai.request(server).get(`/donations/${data._id}/edit`).end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })

        
    })

    // Test create
    it('should create a SINGLE donation on /donations POST', (done) => {
        chai.request(server)
        .post('/donations')
        .send(sampleDonation)
        .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // Test update
    it('should update a SINGLE donations on /donations/<id> PUT', (done) => {
        var donation = new Donation(sampleDonation)
        donation.save((err, data) => {
            chai.request(server).put(`/donations/${data._id}?_method=PUT`)
            .send({"message": "Updating the message"}).end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })

    // Test Delete
    it('should delete a SINGLE donation on /reviews/<id> DELETE', (done) =>{
        var donation = new Donation(sampleDonation)
        donation.save((err, data) => {
            chai.request(server)
            .delete(`/donations/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })
    
    after(() => {
        Donation.deleteMany({'name': 'Jackson'}).exec((err, donations) => {
            donations.remove()
        })
    })
})