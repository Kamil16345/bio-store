import http from "../http-common"
class MaintainShoppingCart{

    getShoppingCart(customerId){
        return http.get(`/api/${customerId}/shoppingCart`)
    }
}
export default new MaintainShoppingCart();