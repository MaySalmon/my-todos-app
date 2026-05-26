import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "@/types/todo";

type TodosState = {
  items: Todo[];
  loading: boolean;
};

const initialState: TodosState = {
  items: [],
  loading: true,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setTodos, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
