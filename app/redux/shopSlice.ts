// redux/shopSlice.js
import { createSlice } from "@reduxjs/toolkit";

import { ShopState } from "../models/shop";

const initialState: ShopState = {
  items: [],
  currentItem: null,
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
  },
});

export const { setItems, setCurrentItem } = shopSlice.actions;
export default shopSlice.reducer;
