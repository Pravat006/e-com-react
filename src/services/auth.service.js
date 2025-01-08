import Axios from "../config/httpRequests.js";

class AuthService {
  async register() {
    return await Axios.post("/users/register", data);
  }
  async login() {
    return await Axios.post("/users/login", data);
  }
  async logout() {
    return await Axios.post("/users/logout");
  }
  async changePassword() {
    return await Axios.post("/users/change-password", data);
  }
  async setAvatar() {
    return await Axios.patch("/users/avatar", data);
  }
  async currentUser(){
    return await Axios.get("/users/current-user");
  }
}
export default new AuthService();