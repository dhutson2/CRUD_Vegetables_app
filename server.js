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

app.get('/vegetables/new', (req,res) => {
    res.render('new.ejs')
})

app.get('/vegetables/:index/edit', (req,res) => {
    res.render('edit.ejs', {
        vegetable: Vegetables[req.params.index],
        index: req.params.index
    })
})

app.put('/vegetables/:index', (req,res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    Vegetables[req.params.index] = req.body
    res.redirect('/vegetables')
})

app.post('/vegetables/', (req,res) => {
    console.log(req.body)
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else{
        req.body.readyToEat = false
    }
    Vegetables.push(req.body)
    res.redirect('/vegetables')
})

app.get('/vegetables/:index', (req, res) => {
    res.render('show.ejs', {
        vegetable: Vegetables[req.params.index]
    })
})









app.listen(3000, () => {
    console.log('CRUD vegetables on port 3000')
})