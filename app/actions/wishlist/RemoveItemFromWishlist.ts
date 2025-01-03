import { useAppDispatch } from "@/app/hooks/redux";

import { ShopItem } from "@/app/models/shop";

import { removeFromWishlist } from "@/app/redux/wishlistSlice";

export function RemoveItemFromWishlist(item: ShopItem) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Function to remove item from cart
  function removeItemFromWishlist() {
    dispatch(removeFromWishlist(item));
  }

  return removeItemFromWishlist;
}
