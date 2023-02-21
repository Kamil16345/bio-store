const path = require('path');
process.env.NODE_CONFIG_DIR='../config'

const express = require('express');
const app = express();
const cors = require('cors')
const winston = require('winston')
const serverless = require('serverless-http')
const router = express.Router()

require('dotenv').config();
require('../startup/logging')()
require('../startup/routes')(app)
require('../startup/db')()
require('../startup/config')()



var corsOptions = {
    origin: "http://localhost:3001",
    headers:{
        "Access-Control-Allow-Origin":"*"
    },
    methods: "GET,PUT,POST,DELETE,OPTIONS"
};

router.get('/json',(req, res)=>{
    res.json({
        'hello':'hi'
    })
})
const port = process.env.PORT || 3000

const server = app.listen(port, ()=>console.log(`App is starting on port: ${port}`))

module.exports=server
app.use(cors(corsOptions))
app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)