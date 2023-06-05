import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: undefined,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.ingredient.type === "bun") {
        state.bun = action.payload.ingredient;
      } else {
        const ingredient = {
          ...action.payload.ingredient,
          uniqueID: action.payload.uniqueID,
        };
        state.ingredients.push(ingredient);
      }
    },
    deleteIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (obj) => obj.uniqueID === action.payload.uniqueID
      );
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    resetIngredients: (state) => {
      state.bun = undefined;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, deleteIngredient, resetIngredients } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
