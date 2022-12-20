const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:12
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    isAdmin:Boolean
})
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    return token
}
const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = {
        name:Joi.string().min(2).max(12).required(),
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema)
}
exports.User = User
exports.validateUser = validateUser
//exports.generateAuthToken = this.generateAuthToken