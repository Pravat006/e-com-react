const formdataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
},
withCredentials: true,
};
const jsonConfig = {
  headers: {
    "Content-Type": "application/json",
},
withCredentials: true,
};
const defaultConfig = {
  withCredentials: true,
};

export { formdataConfig, jsonConfig, defaultConfig };
