const config = require('config')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const Joi = require("joi");
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cors = require("cors");

//fs.readFile(__dirname+'../../client/src/App')
router.options('*', cors())
router.get('/', async (req, res)=>{
    
    const users = await User.find()
    res.send(users)
})

router.get('/:email', cors(), async(req, res)=>{
    //const user = await User.findById(req.params.userId);
    //console.log(req.params.email)
    const user = await User.findOne({email:req.params.email})
    if(!user) return res.status(404).send('There is no such a user.')
    console.log("Here' user data")
    console.log(user)
    res.send(user)
})

router.post('/', cors(), async(req, res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken();
    res.send(token)
})

function validate(req){
    const schema = {
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema)
}

module.exports = router