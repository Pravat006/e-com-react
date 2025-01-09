import Axios from "../config/httpRequests.js";

// these routes can be access by only customers
class AddressService {
  async createAddress(data) {
    return await Axios.post("/ecommerce/addresses", data);
  }
  async getAllAddress() {
    return await Axios.get("/ecommerce/addresses");
  }
  async getAddressById(addressId) {
    return await Axios.get(`/ecommerce/addresses/${addressId}`);
  }
  async deleteAddress(addressId) {
    return await Axios.delete(`/ecommerce/addresses/${addressId}`);
  }
  async updateAddress(addressId,data) {
    return await Axios.patch(`/ecommerce/addresses/${addressId}`, data);
  }
}

export default new AddressService();
