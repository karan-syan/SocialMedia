import axios from "axios";

export const baseURL = "http://localhost:8800/api/";
export const baseImageURL = "http://localhost:8800/api/image/";
export const makeRequest = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
