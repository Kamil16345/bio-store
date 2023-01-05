import http from "../http-common"
class AuthenticateDataService{
    create(data){
        //console.log("Hello")
        return http.post("/api/customers", data)
    }
    getCustomer(email){
        //console.log("Here's customer data")
        //console.log(email)
        return http.get(`/api/customers/${email}`)
    }
}

export default new AuthenticateDataService();