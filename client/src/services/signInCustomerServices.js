import http from "../http-common"
class AuthenticateDataService{
    create(data){
        return http.post(`/api/customers`, data)
    }
    getCustomer(id){
        return http.get(`/api/customers/${id}`)
    }
}

export default new AuthenticateDataService();