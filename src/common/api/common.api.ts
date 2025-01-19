import axios from "axios";

const TODO_API_KEY = process.env.REACT_APP_VERCEL_TODO_API_KEY ;

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "API-KEY": TODO_API_KEY,
  },
});

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("todo-token");
  return config;
});
