import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../../utils/api";

const initialState = {
  orderNumber: undefined,
  orderRequest: false,
  orderFailed: false,
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    getOrderRequest: (state) => {
      state.orderRequest = true;
    },
    getOrderSuccess: (state, action) => {
      state.orderRequest = false;
      state.orderFailed = false;
      state.orderNumber = action.payload;
    },
    getOrderFailed: (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
    },
    resetOrder: (state) => {
      state.orderNumber = undefined;
    },
  },
});

export const submitOrder = (bun, ingredients) => (dispatch) => {
  const ingredientsId = ingredients.map((ingredient) => ingredient._id);
  ingredientsId.push(bun._id);
  ingredientsId.unshift(bun._id);
  dispatch(getOrderRequest());
  createOrder(ingredientsId)
    .then((res) => {
      dispatch(getOrderSuccess(res.order.number));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(getOrderFailed());
    });
};

export const { getOrderRequest, getOrderSuccess, getOrderFailed, resetOrder } =
  orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
