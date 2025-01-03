import { useAppDispatch } from "@/app/hooks/redux";

import { decreaseQuantity } from "@/app/redux/cartSlice";

export function DecreaseItemQuantity(
  id: number,
  size?: string,
  color?: string
) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Function to remove item from cart
  function decreaseItemQuantity() {
    dispatch(decreaseQuantity({ id, size, color }));
  }

  return decreaseItemQuantity;
}
