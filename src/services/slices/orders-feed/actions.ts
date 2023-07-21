import { createAction } from "@reduxjs/toolkit";
import { OrdersFeedResponseType } from "../../types/types";

export const connect = createAction<string>("ORDERS_FEED_CONNECT");
export const disconnect = createAction("ORDERS_FEED_DISCONNECT");
export const wsConnecting = createAction("ORDERS_FEED_WS_CONNECTING");
export const wsOpen = createAction("ORDERS_FEED_WS_OPEN");
export const wsClose = createAction("ORDERS_FEED_WS_CLOSE");
export const wsMessage = createAction<OrdersFeedResponseType>(
  "ORDERS_FEED_WS_MESSAGE"
);
export const wsError = createAction<string>("ORDERS_FEED_WS_ERROR");

export type TOrderFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
