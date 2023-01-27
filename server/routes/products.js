const auth = require('../middleware/auth')
const {Product, validateProduct} = require('../models/product')
const mongoose = require('mongoose')
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const cors = require("cors")

router.options('*', cors())
router.get('/', cors(), async(req,res)=>{
    const products = await Product.find().sort('name')
    res.send(products);
})

router.get('/:id', async (req, res)=>{

    const product = await Product.findById(req.params.id)
    if(!product) return res.status(404).send("There is no product with such ID.")
    res.send(product)
})

router.post('/', auth, async(req, res)=>{
    const { error } = validateProduct(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    
    const category = await Category.findOne({name: req.body.category.name})//.select('-products')
    if(!category) return res.status(400).send('Invalid category')

    let product = new Product({
        name:req.body.name,
        category:{
            name: req.body.category.name,
            _id: category._id
        },
        numberInStock: req.body.numberInStock,
        price: req.body.price
    })

    product = await product.save()
    category.products.push(product)

    category.save()

    res.send(product)
})

router.put('/:id', async(req,res)=>{
    const { error } = validateProduct(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid category')

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category:{
            _id: category._id,
            name: category.name
        },
        numberInStock: req.body.numberInStock.Category,
        price: req.body.price
    }, 
    {
        new: true
    })
    if(!product) return res.status(404).send("There is no product with such ID.")

    res.send(product)
})
router.delete('/:id', async(req, res)=>{
    
    const product = await Product.findByIdAndRemove(req.params.id)
    const category = await Category.

    console.log("category: ")
    console.log(category)
    if(!product) return res.status(404).send("There is no product with such ID.")

    res.send(product)
})

module.exports = router

