import { useAppDispatch } from "@/app/hooks/redux";

import { removeFromWishlist } from "@/app/redux/wishlistSlice";

export function RemoveItemFromWishlist(id: number) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Function to remove item from cart
  function removeItemFromWishlist() {
    dispatch(removeFromWishlist(id));
  }

  return removeItemFromWishlist;
}
