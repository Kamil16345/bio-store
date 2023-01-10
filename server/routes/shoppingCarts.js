//const {Product, validateProduct} = require('../models/product')
const {ShoppingCart, validateShoppingCart} = require('../models/shoppingCart')
const { Product } = require('../models/product');
const { Customer } = require('../models/customer');

const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const cors = require("cors")

router.options('*', cors())
router.get('/shoppingCarts', cors(), async(req,res)=>{
    const shoppingCarts = await Customer.find().select('shoppingCart -_id')
    res.send(shoppingCarts);
    
})

router.post('/:customerId/shoppingCarts', cors(), async(req, res)=>{
    const { error } = validateShoppingCart(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.params.customerId)
    if(!customer) return res.status(400).send('Invalid customer')

    const product = await Product.findById(req.body.productId)
    if(!product) return res.status(400).send('Invalid product')

    // let shoppingCart = new ShoppingCart({
    //     product:{
    //         _id:product._id,
    //         name:product.name,
    //         numberInStock: product.numberInStock,
    //     },
    // })

    customer.shoppingCart.products.push(product)

    shoppingCart = await customer.save()
    
    product.numberInStock--;
    product.save()

    res.send(customer)
})
router.get('/:customerId/shoppingCart', cors(), async (req, res)=>{
    const customer = await Customer.findById(req.params.customerId)
    
    if(!customer) return res.status(404).send("There is no customer with such ID.")

    res.send(customer.shoppingCart)
})
router.put('/:customerId/shoppingCart', async(req,res)=>{
    //TODO: 
    //*restructure shoppingCart structure - product will be array with properties: 
                                          //productId
                                          //name
                                          //amount
                                          //price(amount*productPrice)
    //finish updating put method(you want to update amount)
    const { error } = validateShoppingCart(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }
    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Invalid customer')

    const product = await Product.findById(req.body.productId)
    if(!product) return res.status(400).send('Invalid product')
    
    const shoppingCart = await ShoppingCart.findByIdAndUpdate(req.params.customerId, {
        productId:req.body.productId
    }, 
    {
        new: true
    })
    if(!shoppingCart) return res.status(404).send("There is no shoppingCart with such ID.")

    res.send(shoppingCart)
})
router.delete('/:customerId/shoppingCart', async(req, res)=>{
    const customer = await Customer.findById(req.params.customerId)
    if(!customer) return res.status(404).send("There is no customer with such ID.")
    
    const shoppingCart = await customer.shoppingCart.products.splice(req.body.productIndex, 1)
    //const product = await ShoppingCart.findById(req.body.productId)

    //if(!product) return res.status(404).send('There is no such a product.')
    res.send(customer)
})

module.exports = router


//pobierasz użytkownika
//pobierasz koszyk
//usuwasz produkt