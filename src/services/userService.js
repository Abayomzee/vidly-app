import http from "./httpServices";
// import { usersApi } from "../config.json";

const usersApi = "/users";
export function register(user) {
  return http.post(usersApi, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
