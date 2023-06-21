import {
  getUserRequest,
  registerUserRequest,
  loginUserRequest,
  updateUserRequest,
  logoutUserRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../../utils/api";
import { setToken } from "../../utils/cookie";
import {
  setAuthChecked,
  setUserRequest,
  setUserSuccess,
  setUserFailed,
  submitRequest,
  submitSuccess,
  submitFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
} from "../slices/authSlice";
import Cookies from "js-cookie";

export const getUser = () => (dispatch) => {
  dispatch(setUserRequest());
  getUserRequest()
    .then((res) => {
      dispatch(setUserSuccess(res.user));
      dispatch(setAuthChecked(true));
    })
    .catch((err) => {
      console.error(err.message);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setUserFailed());
    });
};

export const registerUser = (name, email, password) => (dispatch) => {
  dispatch(submitRequest("registerForm"));
  registerUserRequest(name, email, password)
    .then((res) => {
      setToken("accessToken", res.accessToken);
      setToken("refreshToken", res.refreshToken);
      return res;
    })
    .then((res) => {
      dispatch(submitSuccess("registerForm"));
      dispatch(setUserSuccess(res.user));

      dispatch(setAuthChecked(true));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(submitFailed("registerForm"));
    });
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch(submitRequest("loginForm"));
  loginUserRequest(email, password)
    .then((res) => {
      setToken("accessToken", res.accessToken);
      setToken("refreshToken", res.refreshToken);
      return res;
    })
    .then((res) => {
      dispatch(submitSuccess("loginForm"));
      dispatch(setUserSuccess(res.user));
      dispatch(setAuthChecked(true));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(submitFailed("loginForm"));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());
  logoutUserRequest()
    .then(() => {
      dispatch(logoutSuccess());
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(logoutFailed());
    });
};

export const checkUserAuth = () => (dispatch) => {
  if (Cookies.get("accessToken")) {
    dispatch(getUser());
  } else {
    dispatch(setAuthChecked(true));
  }
};

export const updateUser = (name, email, password) => (dispatch) => {
  dispatch(setUserRequest());
  updateUserRequest(name, email, password)
    .then((res) => {
      dispatch(setUserSuccess(res.user));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(setUserFailed());
    });
};

export const forgotPassword = (email, redirect) => (dispatch) => {
  dispatch(submitRequest("forgotPasswordForm"));
  forgotPasswordRequest(email)
    .then(() => {
      localStorage.setItem("forgotPassword", "success");
      dispatch(submitSuccess("forgotPasswordForm"));
      redirect();
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(submitFailed("forgotPasswordForm"));
    });
};

export const resetPassword = (password, token, redirect) => (dispatch) => {
  dispatch(submitRequest("resetPasswordForm"));
  resetPasswordRequest(password, token)
    .then(() => {
      localStorage.removeItem("forgotPassword");
      dispatch(submitSuccess("resetPasswordForm"));
      redirect();
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(submitFailed("resetPasswordForm"));
    });
};

// TEST API
const registerRequestTest = (name, email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        accessToken: "Bearer test-token",
        refreshToken: "test-refresh-token",
        user: {
          name: name,
          email: email,
        },
      });
    }, 1000);
  });

const getUserTest = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          email: "test@email.com",
          name: "testName",
        },
      });
    }, 1000);
  });

const loginUserTest = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,

        accessToken: "test-token",
        refreshToken: "test-refresh-token",
        user: { email: "test@email.com", name: "testName" },
      });
    }, 1000);
  });

const refreshTokenTest = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        accessToken: "Bearer ...",
        refreshToken: "",
      });
    }, 1000);
  });
