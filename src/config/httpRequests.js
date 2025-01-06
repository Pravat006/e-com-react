import { formdataConfig, jsonConfig, defaultConfig } from "./index";
import axio from "axios";

const axio = axio.create({
  baseURl: process.env.SERVER_BASE_URL,
});

class Axios {
  get = async (url) => {
    try {
      const response = await axio.get(url, defaultConfig);
      return response?.data;
    } catch (error) {
      error.response?.data;
    }
  };
  post = async (url, data = {}) => {
    try {
      const config = data instanceof FormData ? formdataConfig : jsonConfig;
      const response = await axio.post(url, data, config);
      return response?.data;
    } catch (error) {
      error.response?.data;
    }
  };
  patch = async (url, data) => {
    try {
      const config = data instanceof FormData ? formdataConfig : jsonConfig;
      const response = await axio.patch(url, data, config);
      return response?.data;
    } catch {
      error.response?.data;
    }
  };
  delete = async () => {
    try {
      const response = await axio.delete(url, defaultConfig);
      return response?.data;
    } catch {
      error.response?.data;
    }
  };
}
