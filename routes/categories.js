const express = require('express');
const mongoose = require('mongoose')
const app = express;
const Joi = require('joi');
const router = app.Router();

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
const Category = mongoose.model('Category', categorySchema)

router.get('/', async(req, res)=>{
    const categories = await Category.find().sort('name');
    res.send(categories)
})
router.get('/:id', async (req, res)=>{
    const category = await Category.findById(req.params.id)
    //const category = categories.find(c=>c.id === parseInt(req.params.id))
    
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
    //const category = categories.find(c => c.id === parseInt(req.params.id))
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if(!category) return res.status(404).send("There is no category with such ID.")

    res.send(category)
})
router.delete('/:id', async(req, res)=>{
    const category = await Category.findByIdAndRemove(req.params.id)
    //const category = categories.find(c => c.id === parseInt(req.params.id))
    if(!category) return res.status(404).send("There is no category with such ID.")

    res.send(category)
})

function validateCategory(category){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(category, schema)
}
module.exports = router;