import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartProduct, CartState } from "../models/cart";

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartProduct[]>) {
      // Replace the entire cart with new items
      state.cart = action.payload;
    },
    addToCart(state, action: PayloadAction<CartProduct>) {
      const newProduct = action.payload;
      const cartItems = state.cart;

      // Check if the product with the same id, size, and color already exists in the cart
      const existingIndex = cartItems.findIndex(
        (product) =>
          product.item.id === newProduct.item.id &&
          product.size === newProduct.size &&
          product.color === newProduct.color
      );

      if (existingIndex !== -1) {
        // Increase the quantity of the existing product
        cartItems[existingIndex].quantity += newProduct.quantity;
      } else {
        // Add the new product to the cart's first index
        cartItems.unshift(newProduct);
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{ id: number; size?: string; color?: string }>
    ) {
      const cartItems = state.cart;

      const { id, size, color } = action.payload;

      // Find the index of the product with matching id, size, and color
      const index = cartItems.findIndex(
        (product) =>
          product.item.id === id &&
          product.size === size &&
          product.color === color
      );

      if (index !== -1) {
        // Remove the product from the cart
        cartItems.splice(index, 1);
      }
    },
    increaseQuantity(
      state,
      action: PayloadAction<{ id: number; size?: string; color?: string }>
    ) {
      const cartItems = state.cart;
      const { id, size, color } = action.payload;

      // Find the product with matching id, size, and color
      const index = cartItems.findIndex(
        (product) =>
          product.item.id === id &&
          product.size === size &&
          product.color === color
      );

      if (index !== -1) {
        // Increase the quantity
        cartItems[index].quantity += 1;
      }
    },
    decreaseQuantity(
      state,
      action: PayloadAction<{ id: number; size?: string; color?: string }>
    ) {
      const cartItems = state.cart;
      const { id, size, color } = action.payload;

      // Find the product with matching id, size, and color
      const index = cartItems.findIndex(
        (product) =>
          product.item.id === id &&
          product.size === size &&
          product.color === color
      );

      if (index !== -1) {
        // Decrease the quantity, but ensure it does not go below 1
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity -= 1;
        }
      }
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
