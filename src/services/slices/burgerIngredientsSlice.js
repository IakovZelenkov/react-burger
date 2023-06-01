import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: null,
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
      state.ingredientsError = false;
      state.ingredients = action.payload;
    },
    getIngredientsError: (state) => {
      state.ingredientsError = true;
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
      dispatch(getIngredientsError());
    });
};

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsError,
} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
