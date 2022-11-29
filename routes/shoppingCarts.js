//const {Product, validateProduct} = require('../models/product')
const {ShoppingCart, validateShoppingCart} = require('../models/shoppingCart')
const { Product } = require('../models/product');
const { Customer } = require('../models/customer');

const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

router.get('/', async(req,res)=>{
    const shoppingCarts = await ShoppingCart.find().sort('name')
    res.send(shoppingCarts);
})

router.post('/', async(req, res)=>{
    const { error } = validateShoppingCart(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Invalid customer')

    const product = await Product.findById(req.body.productId)
    if(!product) return res.status(400).send('Invalid product')

    let shoppingCart = new ShoppingCart({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone: customer.phone
        },
        product:{
            _id:product._id,
            name:product.name,
            numberInStock: product.numberInStock,
 
        },
    })
    shoppingCart = await shoppingCart.save()

    product.numberInStock--;
    product.save()

    res.send(shoppingCart)
})
router.get('/:id', async (req, res)=>{
    const shoppingCart = await ShoppingCart.findById(req.params.id)
    
    if(!shoppingCart) return res.status(404).send("There is no shoppingCart with such ID.")

    res.send(shoppingCart)
})
router.put('/:id', async(req,res)=>{
    const { error } = validateShoppingCart(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }
    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Invalid customer')

    const product = await Product.findById(req.body.productId)
    if(!product) return res.status(400).send('Invalid product')
    
    const shoppingCart = await ShoppingCart.findByIdAndUpdate(req.params.id, {
        customerId:req.body.customerId,
        productId:req.body.productId
    }, 
    {
        new: true
    })
    if(!shoppingCart) return res.status(404).send("There is no shoppingCart with such ID.")

    res.send(shoppingCart)
})
router.delete('/:id', async(req, res)=>{
    const shoppingCart = await ShoppingCart.findByIdAndRemove(req.params.id)
    if(!shoppingCart) return res.status(404).send("There is no shoppingCart with such ID.")

    res.send(shoppingCart)
})

module.exports = router

