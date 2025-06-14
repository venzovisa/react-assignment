import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UsersState } from "../../models";
import api from "../../api/api";

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    const response = await api.getUsers();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(`Failed to fetch users`);
    }
    return response.json();
  }
);

export const updateUserReducer = (
  state: UsersState,
  action: PayloadAction<User>
) => {
  const newData = state.data.map((user) => {
    if (user.id === action.payload.id) {
      return { ...user, ...action.payload };
    }
    return user;
  });
  state.data = newData;
};
