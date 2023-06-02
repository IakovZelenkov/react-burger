import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIngredient: undefined,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    resetSelectedIngredient: (state) => {
      state.selectedIngredient = undefined;
    },
  },
});

export const { setSelectedIngredient, resetSelectedIngredient } =
  ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
