import { formdataConfig, jsonConfig, defaultConfig } from "./index";
import axios from "axios";
import { store } from "../store/store.js"; 

const axioInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
});




axioInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth?.userData?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

class Axios {
  async get(url) {
    try {
      const response = await axioInstance.get(url, defaultConfig);
      return response?.data;
    } catch (error) {
      console.log("error", error)
      return error.response?.data;
    }
  }
  async post(url, data = {}) {
    try {
      const config = data instanceof FormData ? formdataConfig : jsonConfig;
      const response = await axioInstance.post(url, data, config);
      return response?.data;
    } catch (error) {
      return error.response?.data;
    }
  }
  async patch(url, data) {
    try {
      const config = data instanceof FormData ? formdataConfig : jsonConfig;
      const response = await axioInstance.patch(url, data, config);
      return response?.data;
    } catch (error) {
      return error.response?.data;
    }
  }
  async delete(url) {
    try {
      const response = await axioInstance.delete(url, defaultConfig);

      return response?.data;
    } catch (error) {
      return error.response?.data;
    }
  }
}
export default new Axios();
