const express = require('express');
const app = express();
const mongoose = require('mongoose')
const categories = require('./routes/categories')
const customers = require('./routes/customers')
const products = require('./routes/products')
const shoppingCarts = require('./routes/shoppingCarts')

mongoose.connect('mongodb://127.0.0.1/bio-store')
    .then(console.log('Successfully conntected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

app.use(express.json());
app.use('/api/categories', categories)
app.use('/api/customers', customers)
app.use('/api/products', products)
app.use('/api/shoppingCarts', shoppingCarts)

app.get('/',(req, res)=>{
    res.send('Hello world')
})

const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`App is starting on port: ${port}`))