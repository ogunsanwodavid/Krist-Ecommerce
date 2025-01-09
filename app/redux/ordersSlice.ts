import { createSlice } from "@reduxjs/toolkit";

import { OrdersState } from "../models/orders";

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    cancelOrder(state, action) {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
  },
});

export const { setOrders, addOrder, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
