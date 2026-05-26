import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error";

type ToastState = {
  message: string;
  visible: boolean;
  type: ToastType;
};

const initialState: ToastState = {
  message: "",
  visible: false,
  type: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type?: ToastType }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type ?? "success";
      state.visible = true;
    },
    hideToast: (state) => {
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
