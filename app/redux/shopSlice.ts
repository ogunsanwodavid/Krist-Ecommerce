import { createSlice } from "@reduxjs/toolkit";

import { ItemReview, ShopState } from "../models/shop";

const initialState: ShopState = {
  items: [],
  currentItem: null,
  reviews: [],
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
      state.reviews = action.payload.map((review: ItemReview) => ({
        ...review,
        createdAt:
          typeof review.createdAt === "string"
            ? review.createdAt
            : review.createdAt.toISOString(), // Ensure serialization
      }));
    },
  },
});

export const { setItems, setCurrentItem, setReviews } = shopSlice.actions;
export default shopSlice.reducer;
