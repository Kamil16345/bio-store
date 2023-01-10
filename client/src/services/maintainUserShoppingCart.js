import http from "../http-common"
class MaintainShoppingCart{

    getShoppingCart(customerId){
        return http.get(`/api/${customerId}/shoppingCart`)
    }
    postProduct(customerId, product){
        console.log(customerId)
        return http.post(`/api/${customerId}/shoppingCart`, product)
    }
}
export default new MaintainShoppingCart();