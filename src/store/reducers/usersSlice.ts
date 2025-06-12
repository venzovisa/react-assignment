import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
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

const initialState: UsersState = {
  data: [],
  status: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      const newData = state.data.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload };
        }
        return user;
      });
      state.data = newData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
      });
  },
});

export const { updateUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.data;

export const selectUserById = (id: number) => (state: RootState) =>
  state.users.data.find((user: User) => user.id === id);

export default usersSlice.reducer;
