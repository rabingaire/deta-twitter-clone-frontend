import axios from "axios";
import config from "../config";
import * as local from "./local";

axios.interceptors.request.use(function (request) {
  request.headers["X-Authorization"] = local.get("accessToken");
  return request;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.error.status === 401) {
      local.remove("accessToken");
    }
    return Promise.reject(error);
  }
);

export function get(url) {
  return axios.get(`${config.baseUri}/${url}`);
}

export function post(url, data) {
  return axios.post(`${config.baseUri}/${url}`, data);
}

export function patch(url, data) {
  return axios.patch(`${config.baseUri}/${url}`, data);
}
