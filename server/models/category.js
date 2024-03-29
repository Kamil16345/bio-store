const Joi = require('joi');
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    numberInStock:Number,
    price: Number,
    image: Buffer
})

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    products:[ProductSchema]
});

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(category, schema)
}

exports.categorySchema = categorySchema;
exports.Category = Category
exports.validateCategory = validateCategory;