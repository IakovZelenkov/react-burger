import BASE_URL from "./constats";

const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`).then((res) =>
    res.ok ? res.json() : Promise.reject(res.status)
  );
};

export default getIngredients;
