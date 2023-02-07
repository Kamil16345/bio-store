const Joi = require('joi');
const mongoose = require('mongoose')
const { categorySchema } = require('./category')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    category: {
        type: {
            name: String,
            _id: String
        },
        required: true
    },
    numberInStock:{
        type: Number,
        default: 0,
        min:0,
        max:255
    },
    price:{
        type: Number,
        default: 0,
        min:0,
        max:9999
    },
    amountInCart:{
        type: Number,
        default:1
    },
    image:{
        type:Buffer,
        required:false,
        default: Buffer.from([])
    }
});
const Product = mongoose.model('Product', productSchema);

function validateProduct(product){
    const schema = {
        name: Joi.string().min(2).max(30).required(),
        description: Joi.string().min(2).max(300).required(),
        category:Joi.required(),
        numberInStock: Joi.number().min(0).max(255),
        price: Joi.number().min(0).max(9999).required(),
        amountInCart:Joi.number(),
        // image: Joi.binary()
    }
    return Joi.validate(product, schema)
}

exports.Product = Product
exports.validateProduct = validateProduct;