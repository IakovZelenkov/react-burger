import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUser,
} from "./actions";
import { UserType } from "../../types/types";

interface authState {
  user: UserType | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
  isAuthChecked: boolean;
}

const initialState: authState = {
  user: null,
  status: "idle",
  error: null,
  isAuthChecked: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User
      .addCase(getUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      // UpdateUser
      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      // ForgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      // ResetPassword
      .addCase(resetPassword.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.status = "failed";
        state.error = action.payload;
        state.user = null;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { setAuthChecked, resetUser } = authSlice.actions;

export default authSlice.reducer;
