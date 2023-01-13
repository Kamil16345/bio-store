import http from "../http-common"
class MaintainShoppingCart{

    getShoppingCart(customerId){
        return http.get(`/api/${customerId}/shoppingCart`)
    }
    postProduct(customerId, product){
        console.log(customerId)
        console.log(product)
        return http.post(`/api/${customerId}/shoppingCart`)
    }
}
export default new MaintainShoppingCart();