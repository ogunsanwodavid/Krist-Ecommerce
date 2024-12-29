// redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import shopReducer from "./shopSlice";

import { ShopState } from "@/app/models/shop";

export interface ReduxStoreState {
  shop: ShopState;
}

const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
