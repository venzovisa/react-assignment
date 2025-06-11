import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Todo, TodosState } from "../../models";
import api from "../../api/api";

export const fetchTodos = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    const response = await api.getTodos();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(`Failed to fetch todos`);
    }
    const data = await response.json();
    return data;
  }
);

const initialState: TodosState = {
  data: [],
  status: "idle",
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo: (
      state,
      action: PayloadAction<Pick<Todo, "id" | "completed">>
    ) => {
      const newData = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: action.payload.completed };
        }
        return todo;
      });
      state.data = newData;
    },
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
