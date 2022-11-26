const express = require('express');
const app = express();
const mongoose = require('mongoose')
const categories = require('./routes/categories')
const customers = require('./routes/customers')

mongoose.connect('mongodb://127.0.0.1/bio-store')
    .then(console.log('Successfully conntected to MongoDB'))
    .catch(err => console.error('Could not connect do MongoDB', err))

app.use(express.json());
app.use('/api/categories', categories)
app.use('/api/customers', customers)

app.get('/',(req, res)=>{
    res.send('Hello world')
})

const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`App is starting on port: ${port}`))