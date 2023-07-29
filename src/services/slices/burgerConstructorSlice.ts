import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { IngredientType } from "../types/types";

interface BurgerConstructorState {
  bun?: IngredientType;
  ingredients: IngredientType[];
  ingredientsCount: { [ingredientId: string]: number };
}

const initialState: BurgerConstructorState = {
  bun: undefined,
  ingredients: [],
  ingredientsCount: {},
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<{
        ingredient: IngredientType;
        uniqueID: string;
      }>
    ) => {
      if (action.payload.ingredient.type === "bun") {
        if (state.bun) {
          state.ingredientsCount[state.bun._id] = 0;
        }
        state.bun = action.payload.ingredient;
      } else {
        const ingredient = {
          ...action.payload.ingredient,
          uniqueID: action.payload.uniqueID,
        };
        state.ingredients.push(ingredient);
      }
    },
    deleteIngredient: (state, action: PayloadAction<IngredientType>) => {
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
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
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
    increaseIngredientCount: (
      state,
      action: PayloadAction<IngredientType>
    ) => {
      const id = action.payload._id;
      state.ingredientsCount = {
        ...state.ingredientsCount,
        [id]: (state.ingredientsCount[id] || 0) + 1,
      };
    },
    decreaseIngredientCount: (
      state,
      action: PayloadAction<IngredientType>
    ) => {
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
    reseIngredientCount: (state) => {
      state.ingredientsCount = {};
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
  reseIngredientCount,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
