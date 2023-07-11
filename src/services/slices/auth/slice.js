import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUser,
} from "./actions";

const initialState = {
  user: {
    user: null,
    status: "idle", // 'pending' | 'succeeded' | 'failed'
    error: null,
    isAuthChecked: false,
  },
  login: {
    status: "idle",
    error: null,
  },
  register: {
    status: "idle",
    error: null,
  },
  forgotPassword: {
    status: "idle",
    error: null,
  },
  resetPassword: {
    status: "idle",
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
    resetUser: (state) => {
      state.user.user = null;
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
        state.user.status = "pending";
        state.user.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.status = "succeeded";
        state.user.user = action.payload;
        state.user.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user.status = "failed";
        state.user.error = action.payload;
        state.user.user = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.register.status = "pending";
        state.register.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.status = "succeeded";
        state.user.user = action.payload;
        state.user.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.status = "failed";
        state.register.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.login.status = "pending";
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.status = "succeeded";
        state.user.user = action.payload;
        state.user.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.user.status = "pending";
        state.user.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.status = "succeeded";
        state.user.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user.status = "failed";
        state.user.error = action.payload;
      })
      // UpdateUser
      .addCase(updateUser.pending, (state) => {
        state.user.status = "pending";
        state.user.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.status = "succeeded";
        state.user.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user.status = "failed";
        state.user.error = action.payload;
      })
      // ForgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPassword.status = "pending";
        state.forgotPassword.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPassword.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPassword.status = "failed";
        state.forgotPassword.error = action.payload;
      })
      // ResetPassword
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.status = "pending";
        state.resetPassword.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPassword.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.status = "failed";
        state.resetPassword.error = action.payload;
      });
  },
});

export const { setAuthChecked, clearErrors, resetUser } = authSlice.actions;

export default authSlice.reducer;
