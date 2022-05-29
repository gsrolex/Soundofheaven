import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { BASE_URL, TOKEN_PATH } from "../api/login";
import { fetchWrapper } from "../wrapp/jwtApi";

const { publicRuntimeConfig } = getConfig();
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const brukerData = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getAll,
};

function login(username, password) {
  return fetchWrapper
    .post(`${BASE_URL}/${TOKEN_PATH}`, { username, password })
    .then((user) => {
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

export function logout() {
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
