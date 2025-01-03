import { useAppDispatch } from "@/app/hooks/redux";

import { increaseQuantity } from "@/app/redux/cartSlice";

export function IncreaseItemQuantity(
  id: number,
  size?: string,
  color?: string
) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Function to remove item from cart
  function increaseItemQuantity() {
    dispatch(increaseQuantity({ id, size, color }));
  }

  return increaseItemQuantity;
}
