import http from "../http-common"
class AuthenticateDataService{
    create(data){
        return http.post(`/api/customers`, data)
    }
    getCustomer(email){
        return http.get(`/api/customers/${email}`)
    }
}

export default new AuthenticateDataService();