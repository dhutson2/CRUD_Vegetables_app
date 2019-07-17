const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const Vegetables = require('./models/vegetables')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))


app.get('/', (req,res) => {
    res.send(Vegetables)
})

app.get('/vegetables', (req,res) => {
    res.render('index.ejs', {
        vegetables: Vegetables
    })
})

app.get('/vegetables/:index', (req, res) => {
    res.render('show.ejs', {
        vegetable: Vegetables[req.params.index]
    })
})









app.listen(3000, () => {
    console.log('CRUD vegetables on port 3000')
})