const {Category, validateCategory} = require('../models/category')
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

router.get('/', async(req, res)=>{
    const categories = await Category.find().sort('name');
    res.send(categories)
})
router.get('/:id', async (req, res)=>{
    const category = await Category.findById(req.params.id)
    
    if(!category) return res.status(404).send("There is no category with such ID.")

    res.send(category)
})
router.post('/', async(req, res)=>{



    const { error } = validateCategory(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    let category = new Category({name: req.body.name});
    category = await category.save();

    res.send(category);
})
router.put('/:id', async(req,res)=>{
    const { error } = validateCategory(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if(!category) return res.status(404).send("There is no category with such ID.")

    res.send(category)
})
router.delete('/:id', async(req, res)=>{
    const category = await Category.findByIdAndRemove(req.params.id)

    if(!category) return res.status(404).send("There is no category with such ID.")

    res.send(category)
})

module.exports = router;