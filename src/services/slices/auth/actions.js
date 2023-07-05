import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "../../../utils/cookie";
import { setAuthChecked, resetUser } from "./slice";
import {
  getUserRequest,
  registerUserRequest,
  loginUserRequest,
  updateUserRequest,
  logoutUserRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../../../utils/api";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserRequest();
      return res.user;
    } catch (error) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await registerUserRequest(name, email, password);
      setToken("accessToken", res.accessToken);
      setToken("refreshToken", res.refreshToken);
      return res.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginUserRequest(email, password);
      setToken("accessToken", res.accessToken);
      setToken("refreshToken", res.refreshToken);
      return res.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserRequest();
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkUserAuth = () => (dispatch) => {
  if (Cookies.get("accessToken")) {
    dispatch(getUser());
  } else {
    dispatch(setAuthChecked(true));
    dispatch(resetUser());
  }
};

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await updateUserRequest(name, email, password);
      return res.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, redirect }, { rejectWithValue }) => {
    try {
      await forgotPasswordRequest(email);
      Cookies.set("forgotPassword", "success", {
        expires: 1 / 48,
      });
      return redirect();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token, redirect }, { rejectWithValue }) => {
    try {
      await resetPasswordRequest(password, token);
      Cookies.remove("forgotPassword");
      return redirect();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
