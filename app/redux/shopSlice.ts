// redux/shopSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: [],
  reducers: {
    setItems(state, action) {
      return action.payload;
    },
  },
});

export const { setItems } = shopSlice.actions;
export default shopSlice.reducer;
