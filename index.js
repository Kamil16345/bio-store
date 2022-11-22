const express = require('express');
const app = express();

const categories = require('./routes/categories')

app.use(express.json());
app.use('/api/categories', categories)

app.get('/',(req, res)=>{
    res.send('Hello world')
})

const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`App is starting on port: ${port}`))