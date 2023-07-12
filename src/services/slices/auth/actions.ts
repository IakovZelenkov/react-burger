import Cookies from "js-cookie";
import { Dispatch } from "redux";
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
import axios from "axios";
import { UserType } from "../../types/types";

export const getUser = createAsyncThunk<
  UserType,
  undefined,
  { rejectValue: string }
>("auth/getUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getUserRequest();
    return data.user;
  } catch (error) {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    if (axios.isAxiosError(error)) {
      return error.response
        ? rejectWithValue(error.response.data.message)
        : rejectWithValue(error.message);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const registerUser = createAsyncThunk<
  UserType,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const { data } = await registerUserRequest(name, email, password);
    setToken("accessToken", data.accessToken);
    setToken("refreshToken", data.refreshToken);
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response
        ? rejectWithValue(error.response.data.message)
        : rejectWithValue(error.message);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const loginUser = createAsyncThunk<
  UserType,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await loginUserRequest(email, password);
    setToken("accessToken", data.accessToken);
    setToken("refreshToken", data.refreshToken);
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response
        ? rejectWithValue(error.response.data.message)
        : rejectWithValue(error.message);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutUserRequest();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response
        ? rejectWithValue(error.response.data.message)
        : rejectWithValue(error.message);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const checkUserAuth = () => (dispatch: Dispatch<any>) => {
  if (Cookies.get("accessToken")) {
    dispatch(getUser());
  } else {
    dispatch(setAuthChecked(true));
    dispatch(resetUser());
  }
};

export const updateUser = createAsyncThunk<
  UserType,
  { name: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/updateUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await updateUserRequest(name, email, password);
      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response
          ? rejectWithValue(error.response.data.message)
          : rejectWithValue(error.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
);

export const forgotPassword = createAsyncThunk<
  void,
  { email: string; redirect: () => void },
  { rejectValue: string }
>("auth/forgotPassword", async ({ email, redirect }, { rejectWithValue }) => {
  try {
    await forgotPasswordRequest(email);
    Cookies.set("forgotPassword", "success", {
      expires: 1 / 48,
    });
    return redirect();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response
        ? rejectWithValue(error.response.data.message)
        : rejectWithValue(error.message);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string; redirect: () => void },
  { rejectValue: string }
>(
  "auth/resetPassword",
  async ({ password, token, redirect }, { rejectWithValue }) => {
    try {
      await resetPasswordRequest(password, token);
      Cookies.remove("forgotPassword");
      return redirect();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response
          ? rejectWithValue(error.response.data.message)
          : rejectWithValue(error.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
);
