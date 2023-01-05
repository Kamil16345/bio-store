const Joi = require('joi');
const mongoose = require('mongoose');
const { ShoppingCartSchema } = require('./shoppingCart');

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required: true,
        minlength:2
    },
    surname: {
        type:String,
        required: true,
        minlength:2
    },
    phone:{
        type: Number,
        required: false
    },
    isGold:{
        type: Boolean,
        default:false
    },
    shoppingCart:{
        type: new mongoose.Schema({
            products: [ShoppingCartSchema]
        }),
        required: false
    }
})

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        email:Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(7).required(),
        name: Joi.string().min(2).required(),
        surname: Joi.string().min(2).required(),
        phone: Joi.number().min(8),
        isGold: Joi.boolean(),
        shoppingCart:Joi.object()
    }
    return Joi.validate(customer, schema)
}
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;