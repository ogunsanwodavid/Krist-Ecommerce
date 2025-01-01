import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartProduct } from "../models/cart";

const initialState: CartProduct[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(_, action: PayloadAction<CartProduct[]>) {
      // Replace the entire cart with new items
      return action.payload;
    },
    addToCart(state, action: PayloadAction<CartProduct>) {
      const newProduct = action.payload;

      // Check if the product with same id, size, and color already exists in the cart
      const existingProduct = state.find(
        (product) =>
          product.item.id === newProduct.item.id &&
          product.size === newProduct.size &&
          product.color === newProduct.color
      );

      if (existingProduct) {
        // Increase the quantity of the existing product
        existingProduct.quantity += newProduct.quantity;
      } else {
        // Add the new product to the cart
        state.push(newProduct);
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{ id: number; size?: string; color?: string }>
    ) {
      const { id, size, color } = action.payload;

      // Find the index of the product with matching id, size, and color
      const index = state.findIndex(
        (product) =>
          product.item.id === id &&
          product.size === size &&
          product.color === color
      );

      if (index !== -1) {
        // Remove the product from the cart
        state.splice(index, 1);
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
