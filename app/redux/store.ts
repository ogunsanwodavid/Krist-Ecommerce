import { configureStore } from "@reduxjs/toolkit";

import storageEngine from "./storageEngine";

import { persistReducer, persistStore } from "redux-persist";

import shopReducer from "./shopSlice";
import cartReducer from "./cartSlice";

import { ShopState } from "@/app/models/shop";
import { CartState } from "@/app/models/cart";

export interface ReduxStoreState {
  shop: ShopState;
  cart: CartState;
}

// Persist configuration for the shop slice
const shopPersistConfig = {
  key: "shop",
  storage: storageEngine,
  whitelist: ["reviews"], // Only persist the `reviews` state
};

// Persist configuration for the cart slice
const cartPersistConfig = {
  key: "cart",
  storage: storageEngine,
};

// Apply persistReducer to the shop and cart reducers
const persistedShopReducer = persistReducer(shopPersistConfig, shopReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    shop: persistedShopReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
