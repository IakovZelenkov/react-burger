import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { createOrderRequest, getOrderRequest } from "../../utils/api";
import {
  IngredientType,
  OrderType,
} from "../types/types";
import axios from "axios";

interface OrderDetailsState {
  orderNumber: string | undefined;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  order: OrderType | undefined;
}

const initialState: OrderDetailsState = {
  orderNumber: undefined,
  status: "idle",
  error: null,
  order: undefined,
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
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderNumber = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.order = undefined;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.status = "failed";
        state.error = action.payload;
        state.order = undefined;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const submitOrder = createAsyncThunk<
  string,
  { bun: IngredientType; ingredients: IngredientType[] },
  { rejectValue: string }
>(
  "orderDetails/submitOrder",
  async ({ bun, ingredients }, { rejectWithValue }) => {
    try {
      const ingredientsId = ingredients.map((ingredient) => ingredient._id);
      ingredientsId.push(bun._id);
      ingredientsId.unshift(bun._id);
      const { data } = await createOrderRequest(ingredientsId);
      return data.order.number;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
);

export const getOrder = createAsyncThunk<
  OrderType,
  string,
  { rejectValue: string }
>("orderDetails/getOrder", async (orderNumber, { rejectWithValue }) => {
  try {
    const { data } = await getOrderRequest(orderNumber);
    return data.orders[0];
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

export const { resetOrder, clearError } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
