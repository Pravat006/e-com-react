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
  async removeFromCart(productId) {
    return await Axios.delete(`/ecommerce/cart/item/${productId}`);
  }
  async clearCart() {
    return await Axios.delete("/ecommerce/cart/clear");
  }
  async availableCoupons() {
    return await Axios.get("/ecommerce/coupons/customer/available");
  }
  async allCoupons() {
    return await Axios.get("/ecommerce/coupns");
  }
  async getCouponbyId(couponId) {
    return await Axios.get(`/ecommerce/coupons/${couponId}`);
  }
  async applyCoupon(data) {
    return await Axios.post("/ecommerce/coupons/c/apply", data);
  }
  async removeCoupon(data) {
    return await Axios.post("/ecommerce/coupons/c/remove", data);
  }
}

export default new CustomerService();
