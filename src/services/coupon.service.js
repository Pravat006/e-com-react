import Axios from "../config/httpRequests.js";


class CouponService {
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
export default new CouponService()
