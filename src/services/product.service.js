import Axios from "../config/httpRequests.js";

class ProductService {

    async getAllProducts(){
        return await Axios.get("/ecommerce/products")
    }
    async getProductById(productId){
        return await Axios.get(`/ecommerce/products/${productId}`)
    }
    async getProductByCategory(categoryId){
        return await Axios.get(`/ecommerce/products/category/${categoryId}`)
    }
    async getRandomProducts(){
        return await Axios.get("/ecommerce/products/randomProducts")
    }
    async getCategoryById(categoryId){
        return await Axios.get(`/ecommerce/categories/${categoryId}`)
    }
    async getSearchedProducts(searchText){
        return await Axios.get(`/ecommerce/products/s/search?search=${searchText}`)
    }

}

export default new ProductService();
