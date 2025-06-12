import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
import postsReducer from "./reducers/postsSlice";
import todosReducer from "./reducers/todosSlice";

export const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  todos: todosReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
