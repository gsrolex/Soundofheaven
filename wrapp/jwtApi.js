import getConfig from "next/config";

import { brukerData } from "../serv/worker";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: jwtAuthTokenHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...jwtAuthTokenHeader(url) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...jwtAuthTokenHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && brukerData.userValue) {
        brukerData.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export function jwtAuthTokenHeader(url) {
  const user = brukerData.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
