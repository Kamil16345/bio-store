import http from "../http-common"

class MaintainProducts {
    getAllProducts(){
        return http.get('/api/products')
    }
}
export default new MaintainProducts()