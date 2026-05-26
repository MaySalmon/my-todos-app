import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import toastReducer from "./slices/toastSlice";
import modalReducer from "./slices/modalSlice";
import todosReducer from "./slices/todosSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    modal: modalReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
