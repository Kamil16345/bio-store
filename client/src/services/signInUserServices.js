import http from "../http-common"
class AuthenticateDataService{
    create(data){
        console.log("Hello")
        return http.post("/api/auth", data)
    }
}

export default new AuthenticateDataService();