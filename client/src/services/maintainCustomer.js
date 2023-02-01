import http from "../http-common"

class MaintainCustomer {
    getCurrentCustomer(customerId){
        return http.get(`/api/customers/${customerId}`)
    }
}
export default new MaintainCustomer()