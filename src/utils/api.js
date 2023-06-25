import BASE_URL from "./constats";
import { setToken } from "./cookie";

import Cookies from "js-cookie";

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => request(`${BASE_URL}/ingredients`);

export const createOrder = (ingredientsId) =>
  request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });

export const registerUserRequest = (name, email, password) =>
  request(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });

export const loginUserRequest = (email, password) =>
  request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

export const logoutUserRequest = () =>
  request(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: Cookies.get("refreshToken"),
    }),
  });

export const getUserRequest = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
  });
};

export const updateUserRequest = (name, email, password) => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const forgotPasswordRequest = (email) =>
  request(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

export const resetPasswordRequest = (password, token) =>
  request(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });

export const refreshToken = () => {
  request(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: Cookies.get("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setToken("refreshToken", refreshData.refreshToken);
      setToken("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
