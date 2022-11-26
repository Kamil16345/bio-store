const Joi = require('joi');
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const options = { wantResponse: false, joiOptions: { stripUnknown: true }};

const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:3
    },
    isGold:{
        type: Boolean,
        default:false
    },
    phone:{
        type: Number,
        required: false
    }
})

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async(req,res)=>{
    const customers = await Customer.find()
    res.send(customers);
})

router.post('/', async(req, res)=>{
    const { error } = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold:req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    customer = await customer.save()
    res.send(customer)
})
router.get('/:id', async (req, res)=>{
    const customer = await Customer.findById(req.params.id)
    
    if(!customer) return res.status(404).send("There is no customer with such ID.")

    res.send(customer)
})
router.put('/:id', async(req,res)=>{
    const { error } = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone:req.body.phone,
        isGold: req.body.idGold
    }, 
    {
        new: true
    })
    if(!customer) return res.status(404).send("There is no customer with such ID.")

    res.send(customer)
})
router.delete('/:id', async(req, res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer) return res.status(404).send("There is no customer with such ID.")

    res.send(customer)
})
function validateCustomer(customer){
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(3).required(),
        phone: Joi.number()
    }
    return Joi.validate(customer, schema)
}
module.exports = router

