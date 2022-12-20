const express = require('express');
const app = express();
require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')

app.get('/',(req, res)=>{
    res.send('Hello world')
})

const port = process.env.PORT || 3000

const server = app.listen(port, ()=>console.log(`App is starting on port: ${port}`))

module.exports=server