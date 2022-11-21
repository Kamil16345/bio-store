const { application } = require('express');
const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const categories = [
    {id:1, name:"fantasy"},
    {id:2, name:"action"},
    {id:3, name:"sci-fi"},
];
app.get('/',(req, res)=>{
    res.send('Hello world')
})
app.get('/api/categories', (req, res)=>{
    res.send(categories)
})
app.get('/api/categories/:id', (req, res)=>{
    const category = categories.find(c=>c.id === parseInt(req.params.id))
    if(!category) return res.status(404).send("There is no category with such ID.")

    res.send(category)
})
app.post('/api/categories', (req, res)=>{

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
app.put('/api/categories/:id', (req,res)=>{
    const category = categories.find(c => c.id === parseInt(req.params.id))
    if(!category) return res.status(404).send("There is no category with such ID.")

    const { error } = validateCategory(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }
    
    category.name = req.body.name;
    res.send(category)
})
app.delete('/api/categories/:id', (req, res)=>{
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
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`App is starting on port: ${port}`))