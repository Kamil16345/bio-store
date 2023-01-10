const {Customer, validateCustomer} = require('../models/customer')
const {Product} = require('../models/product')
const mongoose = require('mongoose')
const express = require('express');
const { ShoppingCart } = require('../models/shoppingCart');
const router = express.Router();
const cors = require("cors")

router.options('*', cors())
router.get('/', async(req,res)=>{
    const customers = await Customer.find()
    console.log(customer)
    res.send(customers);
})

router.post('/', cors(), async(req, res)=>{
    const { error } = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        email: req.body.email,
        password:req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        isGold:req.body.isGold,
        shoppingCart: {
            products: req.body.shoppingCart.products
        }
    })
    
    customer = await customer.save()
    res.send(customer)
})
router.get('/:email', cors(), async (req, res)=>{
    const customer = await Customer.findOne({email:req.params.email})
    console.log(customer)
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

module.exports = router

