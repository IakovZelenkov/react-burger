import BASE_URL from "./constats";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`).then((res) => checkResponse(res));
};

export const createOrder = (ingredients) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then((res) => checkResponse(res));
};
