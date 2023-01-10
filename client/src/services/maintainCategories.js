import http from "../http-common"

class MaintainCategories {
    getAllCategories(){
        return http.get('/api/categories')
    }
}
export default new MaintainCategories()