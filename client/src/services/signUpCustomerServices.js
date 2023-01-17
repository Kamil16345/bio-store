import http from "../http-common"
class SignUpCustomerServices{
    create(param, data){
        console.log(data)
        return http.post(`/api/${param}`, data)
    }
    getCustomer(email){
        return http.post(`/api/customers/${email}`)
    }
}

export default new SignUpCustomerServices();