import Axios from "../config/httpRequests.js";

class AdminService {
  async createProduct(data) {
    return await Axios.post("/ecommerce/products", data);
  }
  async deleteProduct(productId) {
    return await Axios.delete(`/ecommerce/products/${productId}`);
  }
  async updateProduct(productId,data) {
    return await Axios.patch(`/ecommerce/products/${productId}`, data);
  }
  async removeSubimage(productId, subimageId) {
    return await Axios.patch(
      `/ecommerce/products/remove/subimage/${productId}/${subimageId}`,
      data
    );
  }
  async createCategory(data) {
    return await Axios.post("/ecommerce/categories", data);
  }
  async deleteCategory(categoryId) {
    return await Axios.delete(`/ecommerce/categories/${categoryId}`);
  }
  async updateCategory(categoryId,data) {
    return await Axios.patch(`/ecommerce/categories${categoryId}`, data);
  }
  async createCoupon(data) {
    return await Axios.post("/ecommerce/coupons", data);
  }
  async deleteCoupon(couponId) {
    return await Axios.delete(`/ecommerce/coupons/${couponId}`);
  }
  async updateCoupon(couponId,data) {
    return await Axios.patch(`/ecommerce/coupons/${couponId}`, data);
  }
  async toggleCouponStatus(couponId) {
    return await Axios.patch(`/ecommerce/coupons/status/${couponId}`, data);
  }
  async getOrderList() {
    return await Axios.get("/ecommerce/orders/list/admin");
  }
  async updateOrderStatus(orderId,data) {
    return await Axios.patch(`/ecommerce/orders/ststus/${orderId}`, data);
  }
}

export default new AdminService();
