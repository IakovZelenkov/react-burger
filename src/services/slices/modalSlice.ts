import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetailsModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOrderDetailsModal: (state) => {
      state.orderDetailsModalOpen = true;
    },
    closeOrderDetailsModalOpen: (state) => {
      state.orderDetailsModalOpen = false;
    },
  },
});

export const { openOrderDetailsModal, closeOrderDetailsModalOpen } =
  modalSlice.actions;

export default modalSlice.reducer;
