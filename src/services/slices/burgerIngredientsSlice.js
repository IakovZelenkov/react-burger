import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    getIngredientsRequest: (state) => {
      state.ingredientsRequest = true;
    },
    getIngredientsSuccess: (state, action) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = false;
      state.ingredients = action.payload;
    },
    getIngredientsFailed: (state) => {
      state.ingredientsFailed = true;
      state.ingredientsRequest = false;
    },
  },
});

export const getIngredient = () => (dispatch) => {
  dispatch(getIngredientsRequest());
  getIngredients()
    .then((res) => {
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch(getIngredientsFailed());
    });
};

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
