const Joi = require('joi');
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:3
    },
    isGold:{
        type: Boolean,
        default:false
    },
    phone:{
        type: Number,
        required: false
    }
})

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(3).required(),
        phone: Joi.number()
    }
    return Joi.validate(customer, schema)
}
exports.Customer = Customer;
exports.validate = validateCustomer;