const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const cors = require("cors")

router.options('*', cors())
module.exports = function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid ID')
    cors()
    next()
}