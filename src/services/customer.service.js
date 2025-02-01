import Axios from "../config/httpRequests.js";

class CustomerService {
  async getProfile() {
    return await Axios.get("/ecommerce/profile");
  }
  async updateProfile(data) {
    return await Axios.patch("/ecommerce/profile", data);
  }
  async myOrders() {
    return await Axios.get("/ecommerce/profile/my-orders");
  }
  async getOrderById(orderId) {
    return await Axios.get(`/ecommerce/orders/${orderId}`);
  }
  async myCart() {
    return await Axios.get("/ecommerce/cart");
  }
  async addToCart(productId,data) {
    return await Axios.post(`/ecommerce/cart/item/${productId}`, data);
  }
  async removeItem(productId) {
    return await Axios.delete(`/ecommerce/cart/item/${productId}`);
  }
  async clearCart() {
    return await Axios.delete("/ecommerce/cart/clear");
  }
  
}

export default new CustomerService();
