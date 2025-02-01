import { formdataConfig, jsonConfig, defaultConfig } from "./index";
import axios from "axios";

const axioInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
});

class Axios {
  async get(url) {
    try {
      const response = await axioInstance.get(url, defaultConfig);
      return response?.data;
    } catch (error) {
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
    } catch(error) {
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
