import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../../utils/feedConstants";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    });
});
