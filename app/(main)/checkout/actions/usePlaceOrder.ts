import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { addOrder } from "@/app/redux/ordersSlice";

import { Order } from "@/app/models/orders";

export default function usePlaceOrder() {
  //Cart Products from redux state
  const cartProducts = useAppSelector(
    (state: ReduxStoreState) => state.cart.cart
  );

  //Estimated delivery date : 24 hours from current time
  const estimatedDeliveryDate = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ).toISOString();

  //Redux dispatch function
  const dispatch = useAppDispatch();

  // Map through cart products and prepare orders
  const orders: Order[] = cartProducts.map((product, index) => ({
    id: `${Date.now()}-${index}`, // Unique ID using timestamp and index
    deliveryDate: estimatedDeliveryDate,
    product,
  }));

  //Place Order function
  function placeOrder() {
    // Dispatch orders to Redux state
    orders.forEach((order) => {
      dispatch(addOrder(order));
    });
  }

  return placeOrder;
}
