import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { geIIngredientsRequest } from "../../utils/api";
import { IIngredient } from "../types/types";
import axios from "axios";

interface BurgerIngredientsState {
  ingredients: IIngredient[];
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
      .addCase(geIIngredients.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        geIIngredients.fulfilled,
        (state, action: PayloadAction<IIngredient[]>) => {
          state.status = "succeeded";
          state.ingredients = action.payload;
        }
      )
      .addCase(geIIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const geIIngredients = createAsyncThunk(
  "burgerIngredients/geIIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await geIIngredientsRequest();
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      } else {
        console.error(error);
      }
    }
  }
);

export const { clearError } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
