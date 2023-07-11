import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createOrder, getOrderRequest } from "../../utils/api";
import { TIngredient } from "../types/types";

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
    { bun, ingredients }: { bun: TIngredient; ingredients: TIngredient[] },
    { rejectWithValue }
  ) => {
    try {
      const ingredientsId = ingredients.map((ingredient) => ingredient._id);
      ingredientsId.push(bun._id);
      ingredientsId.unshift(bun._id);
      const { data } = await createOrder(ingredientsId);
      return data.order.number;
    } catch (error: any) {
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  "orderDetails/getOrder",
  async (orderNumber, { rejectWithValue }) => {
    try {
      const res = await getOrderRequest(orderNumber);
      return res.data.orders[0];
    } catch (error: any) {
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { resetOrder, clearError } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
