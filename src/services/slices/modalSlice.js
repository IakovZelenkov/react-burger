import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientDetailsModalOpen: false,
  orderDetailsModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openIngredientDetailsModal: (state) => {
      state.ingredientDetailsModalOpen = true;
    },
    closeIngredientDetailsModal: (state) => {
      state.ingredientDetailsModalOpen = false;
    },
    openOrderDetailsModal: (state) => {
      state.orderDetailsModalOpen = true;
    },
    closeOrderDetailsModalOpen: (state) => {
      state.orderDetailsModalOpen = false;
    },
  },
});

export const {
  openIngredientDetailsModal,
  closeIngredientDetailsModal,
  openOrderDetailsModal,
  closeOrderDetailsModalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
