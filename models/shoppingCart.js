const Joi = require('joi');
const mongoose = require('mongoose')

const shoppingCartSchema = new mongoose.Schema({
    product: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required:false
            }
        }),
    },    
});

const ShoppingCart = mongoose.model('shoppingCart', shoppingCartSchema);

function validateShoppingCart(shoppingCart){
    const schema = {
        //customerId:Joi.string().required(),
        productId:Joi.string().required()
    }
    return Joi.validate(shoppingCart, schema)
}

exports.ShoppingCartSchema= shoppingCartSchema;
exports.ShoppingCart= ShoppingCart;
exports.validateShoppingCart = validateShoppingCart;
