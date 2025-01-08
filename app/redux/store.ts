import { configureStore } from "@reduxjs/toolkit";

import storageEngine from "./storageEngine";

import { persistReducer, persistStore } from "redux-persist";

import shopReducer from "./shopSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import addressesReducer from "./addressesSlice";
import cardsReducer from "./cardsSlice";

import { ShopState } from "@/app/models/shop";
import { CartState } from "@/app/models/cart";
import { WishlistState } from "../models/wishlist";
import { AddressesState } from "../models/addresses";
import { CardsState } from "../models/cards";

export interface ReduxStoreState {
  shop: ShopState;
  cart: CartState;
  wishlist: WishlistState;
  addresses: AddressesState;
  cards: CardsState;
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

//Persist configuration for the wishlist slice
const wishlistPersistConfig = {
  key: "wishlist",
  storage: storageEngine,
};

//Persist configuration for the addresses slice
const addressesPersistConfig = {
  key: "addresses",
  storage: storageEngine,
};

//Persist configuration for the cards slice
const cardsPersistConfig = {
  key: "cards",
  storage: storageEngine,
};

// Apply persistReducer to the reducers
const persistedShopReducer = persistReducer(shopPersistConfig, shopReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);
const persistedAddressesReducer = persistReducer(
  addressesPersistConfig,
  addressesReducer
);
const persistedCardsReducer = persistReducer(cardsPersistConfig, cardsReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    shop: persistedShopReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    addresses: persistedAddressesReducer,
    cards: persistedCardsReducer,
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
