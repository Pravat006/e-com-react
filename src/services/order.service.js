import Axios from "../config/httpRequests.js";

class OrderService {
    async generateOrder(data) {
        return await Axios.post("/ecommerce/orders/provider/razorpay", data);
    }
    async verifyPayment(data) {
        return await Axios.post("/ecommerce/orders/provider/razorpay/verify-payment", data);
    }
    async myOrders() {
        return await Axios.get("/ecommerce/orders");
    }
    async getOrderById(orderId) {
        return await Axios.get(`/ecommerce/orders/${orderId}`);
    }
    async cancelOrder(orderId) {
        return await Axios.delete(`/ecommerce/orders/${orderId}`);
    }
    }
    export default new OrderService();