const express = require('express');
const app = express();
const cors = require('cors')
require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')

var corsOptions = {
    origin: "http://localhost:3001",
    header:{
        "Access-Control-Allow-Origin":"*"
    }
};

app.use(cors(corsOptions))

app.get('/',(req, res)=>{
    res.send('Hello world')
})

const port = process.env.PORT || 3000

const server = app.listen(port, ()=>console.log(`App is starting on port: ${port}`))

module.exports=server