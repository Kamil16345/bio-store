const Joi = require('joi');
const mongoose = require('mongoose')


const shoppingCartSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true
            },
            isGold:{
                type:Boolean,
                default: false,
                required:false
            },
            phone:{
                type: String,
                required:false,
                default:""
            }
        }),
        required:true
    },
    product: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required:true
            }
        }),
        required: true
    },
    
});
const ShoppingCart = mongoose.model('shoppingCart', shoppingCartSchema);

function validateShoppingCart(shoppingCart){
    const schema = {
        customerId:Joi.string().required(),
        productId:Joi.string().required()
    }
    return Joi.validate(shoppingCart, schema)
}

exports.ShoppingCart= ShoppingCart
exports.validateShoppingCart = validateShoppingCart;
