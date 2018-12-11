const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
const Donation = require('../models/donation')
const Review = require('../models/review')

chai.use(chaiHttp)

const mockData = {
        "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=5954&utm_source=DataAPI&utm_content=9af5afa3",
        "mission": "The MDI Biological Laboratory is a rapidly growing, independent non-profit biomedical research institution. Its mission is to improve human health and well-being through basic research, education, and development ventures that transform discoveries into cures.",
        "websiteURL": "http://www.mdibl.org/",
        "tagLine": "Connecting Science, Environment, and Health",
        "charityName": "Mount Desert Island Biological Laboratory",
        ein: "010202467",
        "orgID": 5954,
        "currentRating": {
          "score": 92.61,
          "ratingID": 131800,
          "publicationDate": "2018-06-01T04:00:00.000Z",
          "ratingImage": {
            "small": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4starsb.png",
            "large": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4stars.png"
          },
          "rating": 4,
          "financialRating": {
            "score": 90.36,
            "rating": 4
          },
          "accountabilityRating": {
            "score": 96,
            "rating": 4
          }
        },
        "category": {
          "categoryName": "Research and Public Policy",
          "categoryID": 11,
          "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=11&utm_source=DataAPI&utm_content=9af5afa3",
          "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/research.png?utm_source=DataAPI&utm_content=9af5afa3"
        },
        "cause": {
          "causeID": 35,
          "causeName": "Non-Medical Science & Technology Research",
          "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=11&cuid=35&utm_source=DataAPI&utm_content=9af5afa3",
          "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/nonmedical.jpg?utm_source=DataAPI&utm_content=9af5afa3"
        },
        "irsClassification": {
          "deductibility": "Contributions are deductible",
          "subsection": "501(c)(3)",
          "assetAmount": 31225303,
          "nteeType": "Science and Technology Research Institutes, Services",
          "nteeSuffix": "0",
          "incomeAmount": 12924245,
          "filingRequirement": "990 (all other) or 990EZ return",
          "classification": "Scientific Organization",
          "latest990": "December, 2016",
          "rulingDate": "March, 1954",
          "nteeCode": "U50",
          "groupName": null,
          "deductibilityCode": "1",
          "affiliation": "Independent - the organization is an independent organization or an independent auxiliary (i.e., not affiliated with a National, Regional, or Geographic grouping of organizations).",
          "foundationStatus": "Organization that normally receives no more than one-third of its support from gross investment income and unrelated business income and at the same time more than one-third of its support from contributions, fees, and gross receipts related to exempt purposes.  509(a)(2)",
          "nteeClassification": "Biological, Life Science Research",
          "accountingPeriod": "December",
          "deductibilityDetail": null,
          "exemptOrgStatus": "Unconditional Exemption",
          "exemptOrgStatusCode": "01",
          "nteeLetter": "U"
        },
        "mailingAddress": {
          "country": null,
          "stateOrProvince": "ME",
          "city": "Bar Harbor",
          "postalCode": "04609",
          "streetAddress1": "159 Old Bar Harbor Road",
          "streetAddress2": null
        },
        "donationAddress": {
          "country": null,
          "stateOrProvince": "ME",
          "city": "Salisbury Cove",
          "postalCode": "04672",
          "streetAddress1": "PO Box 35",
          "streetAddress2": null
        },
        "advisories": {
          "severity": null,
          "active": {
            "_rapid_links": {
              "related": {
                "href": "https://api.data.charitynavigator.org/v2/Organizations/010202467/Advisories?status=ACTIVE"
              }
            }
          }
        },
        "organization": {
          "charityName": "Mount Desert Island Biological Laboratory",
          "ein": "010202467",
          "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=5954&utm_source=DataAPI&utm_content=9af5afa3",
          "_rapid_links": {
            "related": {
              "href": "https://api.data.charitynavigator.org/v2/Organizations/010202467"
            }
          }
        }
    }

describe('Charity', function(){
    // Test index
    it('should index all reviews on / GET', function(done){
        chai.request('localhost:3000').get('/').end(function(err, res) {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // Test show 
    it('should show a SINGLE charity on /charities/:ein GET' , function(done){
        chai.request('localhost:3000').get(`/charities/${mockData.ein}`).end(function(err, res) {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })
}) 

module.exports = {mockData};
