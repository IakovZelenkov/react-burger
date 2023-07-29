import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { geIngredientsRequest } from "../../utils/api";
import { IngredientType } from "../types/types";
import axios from "axios";

interface BurgerIngredientsState {
  ingredients: IngredientType[];
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
      .addCase(geIngredients.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        geIngredients.fulfilled,
        (state, action: PayloadAction<IngredientType[]>) => {
          state.status = "succeeded";
          state.ingredients = action.payload;
        }
      )
      .addCase(geIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const geIngredients = createAsyncThunk<
  IngredientType[],
  undefined,
  { rejectValue: string }
>("burgerIngredients/geIngredients", async (_, { rejectWithValue }) => {
  try {
    const { data } = await geIngredientsRequest();
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    } else {
      console.error(error);
    }
  }
});

export const { clearError } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
