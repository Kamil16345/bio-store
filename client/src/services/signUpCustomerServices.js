import http from "../http-common"
class SignCustomerServices{
    create(data){
        console.log(data)
        return http.post("/api/customers", data)
    }
    getCustomer(email){
        return http.post(`/api/customers/${email}`)
    }
}

export default new SignCustomerServices();