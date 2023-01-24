const Joi = require('joi');
const mongoose = require('mongoose')
const { Product } = require("./product")

const shoppingCartSchema = new mongoose.Schema({
    products: [Product.schema]
});

const ShoppingCart = mongoose.model('shoppingCart', shoppingCartSchema);

function validateShoppingCart(shoppingCart){
    const schema = {
        productId:Joi.string().required()
    }
    return Joi.validate(shoppingCart, schema)
}

exports.ShoppingCartSchema= shoppingCartSchema;
exports.ShoppingCart= ShoppingCart;
exports.validateShoppingCart = validateShoppingCart;
