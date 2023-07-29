import { setToken } from "./cookie";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./constants";

axios.defaults.baseURL = BASE_URL;

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "jwt expired"
    ) {
      const refreshToken = Cookies.get("refreshToken");
      const refreshResponse = await axios.post("/auth/token", {
        token: refreshToken,
      });

      if (refreshResponse.data.success) {
        setToken("refreshToken", refreshResponse.data.refreshToken);
        setToken("accessToken", refreshResponse.data.accessToken);
        error.config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return axiosInstance.request(error.config);
      }
    }

    return Promise.reject(error);
  }
);

export const geIngredientsRequest = () => {
  return axiosInstance.get("/ingredients");
};

export const createOrderRequest = (ingredientsId: string[]) => {
  const accessToken = Cookies.get("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return axiosInstance.post(
    "/orders",
    { ingredients: ingredientsId },
    { headers }
  );
};

export const getOrderRequest = (orderNumber: string) => {
  return axiosInstance.get(`orders/${orderNumber}`);
};

export const registerUserRequest = (
  name: string,
  email: string,
  password: string
) => {
  return axiosInstance.post("/auth/register", { email, password, name });
};

export const loginUserRequest = (email: string, password: string) => {
  return axiosInstance.post("/auth/login", { email, password });
};

export const logoutUserRequest = () => {
  const refreshToken = Cookies.get("refreshToken");

  return axiosInstance.post("/auth/logout", { token: refreshToken });
};

export const getUserRequest = () => {
  const accessToken = Cookies.get("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return axiosInstance.get("/auth/user", { headers });
};

export const updateUserRequest = (
  name: string,
  email: string,
  password: string
) => {
  const accessToken = Cookies.get("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return axiosInstance.patch(
    "/auth/user",
    { email, password, name },
    { headers }
  );
};

export const forgotPasswordRequest = (email: string) => {
  return axiosInstance.post("/password-reset", { email });
};

export const resetPasswordRequest = (password: string, token: string) => {
  return axiosInstance.post("/password-reset/reset", { password, token });
};
