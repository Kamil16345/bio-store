const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, validateUser } = require('../models/user')
const cors = require('cors')

router.options('*', cors())
router.get('/', async (req, res)=>{
    const users = await User.find()
    res.send(users)
})

router.get('/me', auth, async(req, res)=>{
    const user = await User.findById(req.user._id).select('-password')
    res.send(user);
})

router.post('/', cors(), async(req, res)=>{
    const { error } = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('User already registered')

    user = new User(_.pick(req.body,['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']))

})

router.put('/:userId', async (req, res)=>{
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
    },
    {
        new: true
    })
    if(!user) return res.status(404).send('There is no user with such ID')
    res.send(user)
})

router.delete('/:userId', async(req, res)=>{
    const user = await User.findByIdAndRemove(req.params.userId)
    if(!user) return res.status(404).send('Wrong user ID!')

    res.send(user)
})


module.exports = router