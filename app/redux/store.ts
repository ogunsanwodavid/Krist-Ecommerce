// redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import shopReducer from "./shopSlice";

import { ShopState } from "@/app/models/shop";

export interface ReduxStoreState {
  shop: ShopState;
}

// Persist configuration for the shop slice
const shopPersistConfig = {
  key: "shop",
  storage,
  whitelist: ["reviews"], // Only persist the `reviews` state
};

const persistedShopReducer = persistReducer(shopPersistConfig, shopReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    shop: persistedShopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
