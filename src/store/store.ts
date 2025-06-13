import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from "./reducers/usersSlice";
import postsReducer from "./reducers/postsSlice";
import todosReducer from "./reducers/todosSlice";
import type { PersistPartial } from "redux-persist/es/persistReducer";

export const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  todos: todosReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (
  preloadedState?: Partial<RootState> & Partial<PersistPartial>
) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: preloadedState as RootState & PersistPartial,
  });
};

export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
