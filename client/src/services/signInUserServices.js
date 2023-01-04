import http from "../http-common"
class AuthenticateDataService{
    create(data){
        //console.log("Hello")
        return http.post("/api/auth", data)
    }
    getUser(email){
        //console.log("Here's user data")
        //console.log(email)
        return http.get(`/api/auth/${email}`)
    }
}

export default new AuthenticateDataService();