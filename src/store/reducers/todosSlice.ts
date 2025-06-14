import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { TodosState } from "../../models";
import { fetchTodos, toggleTodoReducer } from "../actions/todosActions";

const initialState: TodosState = {
  data: [],
  status: "idle",
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo: toggleTodoReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
      });
  },
});

export const { toggleTodo } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.data;

export default todosSlice.reducer;
