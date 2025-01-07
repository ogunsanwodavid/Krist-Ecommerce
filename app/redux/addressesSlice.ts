import { createSlice } from "@reduxjs/toolkit";

import { AddressesState } from "../models/addresses";

const initialState: AddressesState = {
  addresses: [],
};

const addressesSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
  },
});

export const { setAddresses } = addressesSlice.actions;
export default addressesSlice.reducer;
