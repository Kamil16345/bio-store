import axios from "axios";
import http from "../http-common"
class MaintainShoppingCart{

    getShoppingCart(customerId){
        return http.get(`/api/${customerId}/shoppingCart`)
    }
    postProduct( customerData ){
        // console.log("customer data",customerData)
        // console.log("customerId: ", customerData.customerId)
        // console.log("productId: ", customerData.productId)
        // return http.post(`/api/63bf18ba996d2ecbfae7da9e/shoppingCart`, customerData.productId)
        axios({
            baseURL: "http://localhost:3000",
            method: 'post',
            url:`/api/${customerData.customerId}/shoppingCart`,
            data:{
                productId: customerData.productId
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
    }
}
export default new MaintainShoppingCart();