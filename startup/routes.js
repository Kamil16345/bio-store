const express = require('express');
const categories = require('../routes/categories')
const customers = require('../routes/customers')
const products = require('../routes/products')
const shoppingCarts = require('../routes/shoppingCarts')
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../middleware/error')

module.exports = function(app){
    app.use(express.json());
    app.use('/api/categories', categories)
    app.use('/api/customers', customers)
    app.use('/api/products', products)
    app.use('/api', shoppingCarts)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error)
}