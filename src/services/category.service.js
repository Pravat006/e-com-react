import Axios from "../config/httpRequests.js";

class CategoryService {
  async getAllCategory() {
    return await Axios.get("/ecommerce/categories");
  }
  async createCategory(data) {
    return await Axios.post("/ecommerce/categories", data);
  }
  async deleteCategory(categoryId) {
    return await Axios.delete(`/ecommerce/categories/${categoryId}`);
  }
  async updateCategory(categoryId, data) {
    return await Axios.patch(`/ecommerce/categories${categoryId}`, data);
  }
}
export default new CategoryService();
