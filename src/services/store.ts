import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

const wsActions = {
  wsConnect: OrdersFeedWsConnect,
  wsDisconnect: OrdersFeedWsDisonnect,
  onOpen: OrdersFeedWsOpen,
  onClose: OrdersFeedWsClose,
  onError: OrdersFeedWsError,
  onMessage: OrdersFeedWsMessage,
  wsConnecting: OrdersFeedWsConnecting,
};

const ordersFeedMiddleware = socketMiddleware(wsActions);

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  modal: modalReducer,
  auth: authRedcuer,
  ordersFeed: ordersFeedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersFeedMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
