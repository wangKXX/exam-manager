import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
instance.interceptors.request.use(function (config) {
  config.baseURL = "/local"
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;