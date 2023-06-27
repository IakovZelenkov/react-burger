import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUser,
} from "../actions/authActions";

const initialState = {
  user: {
    user: null,
    loading: "idle", // 'pending' | 'succeeded' | 'failed'
    error: null,
    isAuthChecked: false,
  },
  login: {
    loading: "idle",
    error: null,
  },
  register: {
    loading: "idle",
    error: null,
  },
  forgotPassword: {
    loading: "idle",
    error: null,
  },
  resetPassword: {
    loading: "idle",
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.user.isAuthChecked = action.payload;
    },
    clearErrors: (state) => {
      state.user.error = null;
      state.login.error = null;
      state.register.error = null;
      state.forgotPassword.error = null;
      state.resetPassword.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User
      .addCase(getUser.pending, (state) => {
        state.user.loading = "pending";
        state.user.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.loading = "succeeded";
        state.user.user = action.payload;
        state.user.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user.loading = "failed";
        state.user.error = action.payload;
        state.user.user = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.register.loading = "pending";
        state.register.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.loading = "succeeded";
        state.user.user = action.payload;
        state.user.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.loading = "failed";
        state.register.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.login.loading = "pending";
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = "succeeded";
        state.user.user = action.payload;
        state.user.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = "failed";
        state.login.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.user.loading = "pending";
        state.user.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.loading = "succeeded";
        state.user.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user.loading = "failed";
        state.user.error = action.payload;
      })
      // UpdateUser
      .addCase(updateUser.pending, (state) => {
        state.user.loading = "pending";
        state.user.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.loading = "succeeded";
        state.user.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user.loading = "failed";
        state.user.error = action.payload;
      })
      // ForgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPassword.loading = "pending";
        state.forgotPassword.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPassword.loading = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPassword.loading = "failed";
        state.forgotPassword.error = action.payload;
      })
      // ResetPassword
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.loading = "pending";
        state.resetPassword.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPassword.loading = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.loading = "failed";
        state.resetPassword.error = action.payload;
      });
  },
});

export const { setAuthChecked, clearErrors } = authSlice.actions;

export default authSlice.reducer;
