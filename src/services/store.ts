import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./slices/burgerIngredientsSlice";
import burgerConstructorReducer from "./slices/burgerConstructorSlice";
import orderDetailsReducer from "./slices/orderDetailsSlice";
import modalReducer from "./slices/modalSlice";
import authRedcuer from "./slices/auth/slice";
import { ordersFeedReducer } from "./slices/orders-feed/reducer";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  connect as OrdersFeedWsConnect,
  disconnect as OrdersFeedWsDisonnect,
  wsOpen as OrdersFeedWsOpen,
  wsClose as OrdersFeedWsClose,
  wsError as OrdersFeedWsError,
  wsMessage as OrdersFeedWsMessage,
  wsConnecting as OrdersFeedWsConnecting,
} from "./slices/orders-feed/actions";

const ordersFeedMiddleware = socketMiddleware({
  wsConnect: OrdersFeedWsConnect,
  wsDisconnect: OrdersFeedWsDisonnect,
  onOpen: OrdersFeedWsOpen,
  onClose: OrdersFeedWsClose,
  onError: OrdersFeedWsError,
  onMessage: OrdersFeedWsMessage,
  wsConnecting: OrdersFeedWsConnecting,
});

export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    modal: modalReducer,
    auth: authRedcuer,
    ordersFeed: ordersFeedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersFeedMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
