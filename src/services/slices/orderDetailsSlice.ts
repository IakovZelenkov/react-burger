import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createOrder, getOrderRequest } from "../../utils/api";
import { IIngredient, ICreateOrderResponse } from "../types/types";
import axios from "axios";

interface OrderDetailsState {
  orderNumber: number | undefined;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  order: [];
}

const initialState: OrderDetailsState = {
  orderNumber: undefined,
  status: "idle",
  error: null,
  order: [],
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderNumber = undefined;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        submitOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.orderNumber = action.payload;
        }
      )
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getOrder.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.order = [];
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.order = [];
      });
  },
});

export const submitOrder = createAsyncThunk(
  "orderDetails/submitOrder",
  async (
    { bun, ingredients }: { bun: IIngredient; ingredients: IIngredient[] },
    { rejectWithValue }
  ) => {
    try {
      const ingredientsId = ingredients.map((ingredient) => ingredient._id);
      ingredientsId.push(bun._id);
      ingredientsId.unshift(bun._id);
      const res: any = await createOrder(ingredientsId);
      return res.order.number;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      } else {
        console.error(error);
      }
    }
  }
);

export const getOrder = createAsyncThunk(
  "orderDetails/getOrder",
  async (orderNumber: string, { rejectWithValue }) => {
    try {
      const res = await getOrderRequest(orderNumber);
      return res.data.orders[0];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      } else {
        console.error(error);
      }
    }
  }
);

export const { resetOrder, clearError } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
