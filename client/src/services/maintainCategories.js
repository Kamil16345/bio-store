import http from "../http-common"

class MaintainCategories {
    getAllCategories(){
        return http.get('/api/categories')
    }
    getCategory(categoryId){
        return http.get(`/api/categories/${categoryId}`)
    }

}
export default new MaintainCategories()