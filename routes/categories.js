const express = require('express');
const app = express;
const Joi = require('joi');
const router = app.Router();

const categories = [
    {id:1, name:"eco food"},
    {id:2, name:"gluten-free food"},
    {id:3, name:"dietary supplements"},
];

router.get('/', (req, res)=>{
    res.send(categories)
})
router.get('/:id', (req, res)=>{
    const category = categories.find(c=>c.id === parseInt(req.params.id))
    if(!category) return res.status(404).send("There is no category with such ID.")

    res.send(category)
})
router.post('/', (req, res)=>{

    const { error } = validateCategory(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const category = {
        id: categories.length+1,
        name: req.body.name
    };

    categories.push(category);
    res.send(category);
})
router.put('/:id', (req,res)=>{
    const category = categories.find(c => c.id === parseInt(req.params.id))
    if(!category) return res.status(404).send("There is no category with such ID.")

    const { error } = validateCategory(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }
    
    category.name = req.body.name;
    res.send(category)
})
router.delete('/:id', (req, res)=>{
    const category = categories.find(c => c.id === parseInt(req.params.id))
    if(!category) return res.status(404).send("There is no category with such ID.")

    const index = categories.indexOf(category)
    categories.splice(index, 1)
    res.send(category)
})

function validateCategory(category){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(category, schema)
}
module.exports = router;