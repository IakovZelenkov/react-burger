import { configureStore } from "@reduxjs/toolkit";
import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import burgerIngredientsReducer from "./slices/burgerIngredientsSlice";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = configureStore(
  {
    reducer: {
      burgerIngredients: burgerIngredientsReducer,
    },
  },
  enhancer
);
