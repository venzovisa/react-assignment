import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
import postsReducer from "./reducers/postsSlice";
import todosReducer from "./reducers/todosSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
