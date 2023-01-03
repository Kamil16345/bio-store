import http from "../http-common"
class SignUpUserServices{
    create(data){
        console.log("Hello from signing up")
        return http.post("/api/users", data)
    }
    getUser(data){
        return http.post("/api/users/:userId", data)
    }
}

export default new SignUpUserServices();