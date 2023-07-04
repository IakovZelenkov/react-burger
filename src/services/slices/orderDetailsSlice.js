import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrderRequest } from "../../utils/api";

const initialState = {
  orderNumber: undefined,
  loading: "idle", // 'pending' | 'succeeded' | 'failed'
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
        state.loading = "pending";
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orderNumber = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.order = [];
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
        state.order = [];
      });
  },
});

export const submitOrder = createAsyncThunk(
  "orderDetails/submitOrder",
  async ({ bun, ingredients }, { rejectWithValue }) => {
    try {
      const ingredientsId = ingredients.map((ingredient) => ingredient._id);
      ingredientsId.push(bun._id);
      ingredientsId.unshift(bun._id);
      const res = await createOrder(ingredientsId);
      return res.order.number;
    } catch (error) {
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
    } catch (error) {
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { resetOrder, clearError } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
