import { createSlice } from "@reduxjs/toolkit";

import { ItemReview, ShopState } from "../models/shop";

//import reviewAvatar3 from "@/public/reviewAvatar3.jpeg";

const initialState: ShopState = {
  items: [],
  currentItem: null,
  reviews: [
    /*  {
      userId: "0X3",
      itemId: 37,
      avatar: reviewAvatar3,
      name: "Mark Williams",
      rating: 5,
      title: "What I expected",
      description:
        "Nice product but I’ll likely look for alternatives next time.",
      createdAt: new Date(2024, 10, 30).toISOString(),
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
