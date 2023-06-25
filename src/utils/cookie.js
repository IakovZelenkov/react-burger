import Cookies from "js-cookie";

export const setToken = (name, value) => {
  let inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
  let authToken = value;
  if (value.indexOf("Bearer") === 0) {
    authToken = value.split("Bearer ")[1];
  }
  if (authToken) {
    Cookies.set(name, authToken, {
      expires: inTwentyMinutes,
    });
  }
};
