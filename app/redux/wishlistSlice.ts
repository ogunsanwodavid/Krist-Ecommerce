import { createSlice } from "@reduxjs/toolkit";

import { WishlistState } from "../models/wishlist";

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addToWishlist(state, action) {
      state.items.unshift(action.payload);
    },
    removeFromWishlist(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { setItems, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
