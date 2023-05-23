import React from "react";

export const BurgerIngredientsContext = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { price: state.price + action.payload };
    case "remove":
      return { price: state.price - action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};
