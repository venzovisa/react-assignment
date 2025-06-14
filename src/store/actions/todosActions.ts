import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { Todo, TodosState } from "../../models";

export const fetchTodos = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    const response = await api.getTodos();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(`Failed to fetch todos`);
    }
    return response.json();
  }
);

export const toggleTodoReducer = (
  state: TodosState,
  action: PayloadAction<Pick<Todo, "id" | "completed">>
) => {
  const newData = state.data.map((todo) => {
    if (todo.id === action.payload.id) {
      return { ...todo, completed: action.payload.completed };
    }
    return todo;
  });
  state.data = newData;
};
