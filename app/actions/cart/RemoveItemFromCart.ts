import { useAppDispatch } from "@/app/hooks/redux";

import { removeFromCart } from "@/app/redux/cartSlice";

export function RemoveItemFromCart(id: number, size?: string, color?: string) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Function to remove item from cart
  function removeItemFromCart() {
    dispatch(removeFromCart({ id, size, color }));
  }

  return removeItemFromCart;
}
