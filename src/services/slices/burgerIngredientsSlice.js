import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/api";

const initialState = {
  ingredients: [],
  loading: "idle", // 'pending' | 'succeeded' | 'failed'
  error: null,
};

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const getIngredients = createAsyncThunk(
  "burgerIngredients/getIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getIngredientsRequest();
      return res.data;
    } catch (error) {
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { clearError } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
