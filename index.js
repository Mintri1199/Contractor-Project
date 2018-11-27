// Initials
const express = require('express')
const app = express()
const path = require('path')
var exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main',
    extname: 'hbs'
})

// Mock Array
let charity = [
    {name: "Charity Name", description: "Charity Description"},
    {name: "Second Charity", description: "Ay lmao"}
]

// Middlewares
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')
//app.use(charities)

app.get('/', (req, res) => {
    res.render('home', {charity: charity})
})


// Telling the server to connect to port 3000
app.listen(3000, () =>{
    console.log('App listening on port 3000!');
})

module.exports = app 