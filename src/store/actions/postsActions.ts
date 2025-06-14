import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { Post } from "../../models";

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId: string | number | undefined, thunkAPI) => {
    const response = await api.getPostsByUserId(userId);
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to fetch posts for the user id ${userId}`
      );
    }
    return response.json();
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string | number | undefined, thunkAPI) => {
    const response = await api.deletePostById(id);
    if (!response.ok) {
      return thunkAPI.rejectWithValue(`Failed to delete post with id: ${id}`);
    }
    return id;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post, thunkAPI) => {
    const response = await api.updatePost(post);
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to update post with id: ${post.id}`
      );
    }
    return post;
  }
);
