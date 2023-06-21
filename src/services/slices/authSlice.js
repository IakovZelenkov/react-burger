import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    user: null,
    request: false,
    failed: false,
  },
  isAuthChecked: false,
  loginForm: {
    email: "",
    password: "",
    request: false,
    failed: false,
  },
  registerForm: {
    name: "",
    email: "",
    password: "",
    request: false,
    failed: false,
  },
  forgotPasswordForm: {
    email: "",
    request: false,
    failed: false,
  },
  resetPasswordForm: {
    password: "",
    token: "",
    request: false,
    failed: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUserRequest: (state) => {
      state.user.request = true;
    },
    setUserSuccess: (state, action) => {
      state.user.request = false;
      state.user.failed = false;
      state.user.user = action.payload;
    },
    setUserFailed: (state) => {
      state.user.request = false;
      state.user.failed = true;
      state.user.user = null;
    },
    setFormValue: (state, action) => {
      const { value, fieldName, formName } = action.payload;
      state[formName][fieldName] = value;
    },

    submitRequest: (state, action) => {
      state[action.payload].request = true;
    },
    submitSuccess: (state, action) => {
      state[action.payload].request = false;
      state[action.payload].failed = false;
      state[action.payload] = initialState[action.payload];
    },
    submitFailed: (state, action) => {
      state[action.payload].request = false;
      state[action.payload].failed = true;
    },
    logoutRequest: (state) => {
      state.user.request = true;
    },
    logoutSuccess: (state) => {
      state.user.request = false;
      state.user.failed = false;
      state.user.user = null;
    },
    logoutFailed: (state) => {
      state.user.request = false;
      state.user.failed = true;
    },
  },
});

export const {
  setAuthChecked,
  setUserRequest,
  setUserSuccess,
  setUserFailed,
  setFormValue,
  submitRequest,
  submitSuccess,
  submitFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
