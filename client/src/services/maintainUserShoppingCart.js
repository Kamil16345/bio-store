import axios from "axios";
import http from "../http-common"
class MaintainShoppingCart{

    getShoppingCart(customerId){
        return http.get(`/api/${customerId}/shoppingCart`)
    }
    postProduct( customerData ){axios({
            baseURL: "http://localhost:3000",
            method: 'post',
            url:`/api/${customerData.customerId}/shoppingCart`,
            data:{
                productId: customerData.productId,
                operation:customerData.operation
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }, console.log("customerData: "), console.log(customerData))
    }
}
export default new MaintainShoppingCart();