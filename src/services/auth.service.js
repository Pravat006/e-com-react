import Axios from "../config/httpRequests.js";

class AuthService {
  async register(data) {
    return await Axios.post("/users/register", data);
  }
  async login(data) {
    return await Axios.post("/users/login", data);
  }
  async logout() {
    return await Axios.post("/users/logout");
  }
  async changePassword(data) {
    return await Axios.post("/users/change-password", data);
  }
  async setAvatar(data) {
    return await Axios.patch("/users/avatar", data);
  }
  async currentUser(){
    return await Axios.get("/users/current-user");
  }
  async changeAvatar(data){
    return Axios.patch("/users/avatar", data);
  }
}
export default new AuthService();