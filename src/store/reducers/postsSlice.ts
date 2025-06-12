import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Post, PostsState } from "../../models";
import api from "../../api/api";

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId: string | number | undefined, thunkAPI) => {
    const response = await api.getPostsByUserId(userId);
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to fetch posts for the user ${userId}`
      );
    }
    return response.json();
  }
);

const initialState: PostsState = {
  data: [],
  status: "idle",
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost: (state, action: PayloadAction<Post>) => {
      const newData = state.data.map((post) => {
        if (
          post.id === action.payload.id &&
          post.userId === action.payload.userId
        ) {
          return { ...post, ...action.payload };
        }
        return post;
      });
      state.data = newData;
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPostsByUserId.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
      });
  },
});

export const { updatePost, deletePost } = postsSlice.actions;

export const selectPostsByUserId = (id: number) => (state: RootState) =>
  state.posts.data.filter((post: Post) => post.userId === id);

export const selectPosts = (state: RootState) => state.posts.data;

export default postsSlice.reducer;
