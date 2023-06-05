import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";
const initialState = {
  bun: undefined,
  ingredients: [],
  ingredientsCount: {},
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
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = state.ingredients;
      const updatedIngredients = update(ingredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, ingredients[dragIndex]],
        ],
      });
      state.ingredients = updatedIngredients;
    },
    increaseIngredientCount: (state, action) => {
      const id = action.payload._id;
      state.ingredientsCount = {
        ...state.ingredientsCount,
        [id]: (state.ingredientsCount[id] || 0) + 1,
      };
    },
    decreaseIngredientCount: (state, action) => {
      const id = action.payload._id;
      const count = state.ingredientsCount[id];
      if (count > 0) {
        state.ingredientsCount = {
          ...state.ingredientsCount,
          [id]: count - 1,
        };
        if (count - 1 === 0) {
          delete state.ingredientsCount[id];
        }
      }
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  resetIngredients,
  moveIngredient,
  increaseIngredientCount,
  decreaseIngredientCount,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
