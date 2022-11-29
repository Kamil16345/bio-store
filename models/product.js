const Joi = require('joi');
const mongoose = require('mongoose')
const { categorySchema } = require('./category')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    numberInStock:{
        type: Number,
        default: 0,
        min:0,
        max:255
    },
    dailySales:{
        type:Number,
        default:0,
        min:0,
        max:255
    }
});
const Product = mongoose.model('Product', productSchema);

function validateProduct(product){
    const schema = {
        name: Joi.string().min(2).required(),
        categoryId:Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailySales: Joi.number().min(0).max(255)
    }
    return Joi.validate(product, schema)
}

exports.Product = Product
exports.validate = validateProduct;
