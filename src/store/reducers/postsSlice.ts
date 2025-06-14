import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Post, PostsState } from "../../models";
import {
  deletePost,
  fetchPostsByUserId,
  updatePost,
} from "../actions/postsActions";

const initialState: PostsState = {
  data: [],
  status: "idle",
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
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
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.type;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.type;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
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
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.type;
      });
  },
});

export const selectPostsByUserId = (id: number) => (state: RootState) =>
  state.posts.data.filter((post: Post) => post.userId === id);

export const selectPosts = (state: RootState) => state.posts.data;

export default postsSlice.reducer;
