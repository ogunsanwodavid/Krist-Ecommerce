// redux/shopSlice.js
import { createSlice } from "@reduxjs/toolkit";

import { ShopState } from "../models/shop";

const initialState: ShopState = {
  items: [],
  currentItem: null,
  reviews: [
    /* {
      itemId: 63,
      avatar: reviewAvatar3,
      name: "Mark Williams",
      rating: 4.2,
      title: "What I expected",
      description:
        "Nice product but I’ll likely look for alternatives next time.",
      createdAt: new Date(2024, 10, 12),
    }, */
  ],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
  },
});

export const { setItems, setCurrentItem, setReviews } = shopSlice.actions;
export default shopSlice.reducer;
