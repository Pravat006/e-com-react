import Axios from "../config/httpRequests.js";

class ProductService {

    async getAllProducts(pageNumber){
        if (!pageNumber) {
            return await Axios.get(`/ecommerce/products?limit=5`)
        }
        return await Axios.get(`/ecommerce/products?page=${pageNumber}&limit=5`)
    }
    async productTable(pageNumber){
        return await Axios.get(`/ecommerce/products?page=${pageNumber}&limit=7`)
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
