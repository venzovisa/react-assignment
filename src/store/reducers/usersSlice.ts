import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User, UsersState } from "../../models";
import { fetchUsers, updateUserReducer } from "../actions/usersActions";

const initialState: UsersState = {
  data: [],
  status: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: updateUserReducer,
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
