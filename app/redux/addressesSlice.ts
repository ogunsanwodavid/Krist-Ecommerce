import { createSlice } from "@reduxjs/toolkit";

import { AddressesState } from "../models/addresses";

const initialState: AddressesState = {
  addresses: [],
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
    addAddress(state, action) {
      const newAddress = action.payload;

      console.log(newAddress);

      // Check if `default` key is true in the new address
      if (newAddress.default) {
        // Set `default` to false for all existing addresses
        state.addresses = state.addresses.map((address) =>
          address.default ? { ...address, default: false } : address
        );
      }

      // Add the new address
      state.addresses.push(newAddress);
    },
    removeAddress(state, action) {
      const idToRemove = action.payload;

      // Filter out the address with the matching ID
      state.addresses = state.addresses.filter(
        (address) => address.id !== idToRemove
      );
    },
  },
});

export const { setAddresses, addAddress, removeAddress } =
  addressesSlice.actions;
export default addressesSlice.reducer;
