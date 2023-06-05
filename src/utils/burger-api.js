import BASE_URL from "./constats";

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

export const getIngredients = () => request(`${BASE_URL}/ingredients`);

export const createOrder = (ingredientsId) =>
  request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });
