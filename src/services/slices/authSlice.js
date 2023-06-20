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
    code: "",
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
} = authSlice.actions;

export default authSlice.reducer;
