import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/api";
import { TIngredient } from "../types/types";

interface BurgerIngredientsState {
  ingredients: TIngredient[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BurgerIngredientsState = {
  ingredients: [],
  status: "idle",
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
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.status = "succeeded";
          state.ingredients = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const getIngredients = createAsyncThunk(
  "burgerIngredients/getIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getIngredientsRequest();
      return res.data;
    } catch (error: any) {
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { clearError } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
