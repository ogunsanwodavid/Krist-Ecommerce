// redux/shopSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    items: [],
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = shopSlice.actions;
export default shopSlice.reducer;
