import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "ADD_TODO";

type ModalState = {
  isOpen: boolean;
  modalType: ModalType | null;
};

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: ModalType }>) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
