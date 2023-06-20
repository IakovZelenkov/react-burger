// import { api } from "../utils/api";
import { setToken, getToken, removeToken } from "../../utils/cookie";
import {
  setAuthChecked,
  setUserRequest,
  setUserSuccess,
  setUserFailed,
  submitRequest,
  submitSuccess,
  submitFailed,
} from "../slices/authSlice";

// export const getUser = () => {
//   return (dispatch) => {
//     return api.getUser().then((res) => {
//       dispatch(setUser(res.user));
//     });
//   };
// };

export const getUser = () => (dispatch) => {
  dispatch(setUserRequest());
  getUserTest()
    .then((res) => {
      dispatch(setUserSuccess(res.user));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(setUserFailed());
    });
};

export const registerUser =
  (name, email, password, callback) => (dispatch) => {
    dispatch(submitRequest("registerForm"));
    registerRequestTest(name, email, password)
      .then((res) => {
        setToken("accessToken", res.accessToken);
        setToken("refreshToken", res.refreshToken);
      })
      .then((res) => {
        dispatch(submitSuccess("registerForm"));
        dispatch(setUserSuccess(res.user));
        dispatch(setAuthChecked(true));
        callback();
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(submitFailed("registerForm"));
      });
  };

export const loginUser = (email, password, callback) => (dispatch) => {
  dispatch(submitRequest("loginForm"));
  loginUserTest(email, password)
    .then((res) => {
      setToken("accessToken", res.accessToken);
      setToken("refreshToken", res.refreshToken);
    })
    .then((res) => {
      dispatch(submitSuccess("loginForm"));
      dispatch(setUserSuccess(res.user));
      dispatch(setAuthChecked(true));
      callback();
    })

    .catch((err) => {
      console.error(err.message);
      dispatch(submitFailed("loginForm"));
    });
};

export const checkUserAuth = () => (dispatch) => {
  if (getToken("accessToken")) {
    dispatch(getUser())
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(refreshTokenTest(getToken("refreshToken")));
        } else {
          removeToken("accessToken");
          removeToken("refreshToken");
          dispatch(setUserSuccess({}));
        }
      })
      .finally(() => {
        dispatch(setAuthChecked(true));
      });
  } else {
    dispatch(setAuthChecked(true));
  }
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
