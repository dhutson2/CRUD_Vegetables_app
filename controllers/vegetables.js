const express = require('express')
const router = express.Router()
const Vegetables = require('../models/vegetables')

// route to display current list of vegetables (model)
router.get('/', (req,res) => {
    res.render('index.ejs', {
        vegetables: Vegetables
    })
})

router.get('/new', (req,res) => {
    res.render('new.ejs')
})

// get and post routes to edit a vegetable existing in list
router.get('/:index/edit', (req,res) => {
    res.render('edit.ejs', {
        vegetable: Vegetables[req.params.index],
        index: req.params.index
    })
})

router.put('/:index', (req,res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    Vegetables[req.params.index] = req.body
    res.redirect('/vegetables')
})

// route to delete an item from vegetable list
router.delete('/:index', (req,res) => {
    Vegetables.splice(req.params.index, 1)
    res.redirect('/vegetables')
})

router.post('/', (req,res) => {
    console.log(req.body)
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else{
        req.body.readyToEat = false
    }
    Vegetables.push(req.body)
    res.redirect('/vegetables')
})

router.get('/:index', (req, res) => {
    res.render('show.ejs', {
        vegetable: Vegetables[req.params.index]
    })
})

module.exports = router;