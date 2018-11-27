const express = require('express')
const app = express()
const path = require('path')
var exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')




app.get('/', (req, res) => {
    res.render('home')
})


// Telling the server to connect to port 3000
app.listen(3000, () =>{
    console.log('App listening on port 3000!');
})