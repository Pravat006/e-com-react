const formdataConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
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
