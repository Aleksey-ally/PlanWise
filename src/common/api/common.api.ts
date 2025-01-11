import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "API-KEY": "bfc1e1b1-e625-4414-a10c-6bab615df806",
  },
});

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("todo-token");
  return config;
});
