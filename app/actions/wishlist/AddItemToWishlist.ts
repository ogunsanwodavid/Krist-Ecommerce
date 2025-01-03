import { useAppDispatch } from "@/app/hooks/redux";

import { ShopItem } from "@/app/models/shop";

import { addToWishlist } from "@/app/redux/wishlistSlice";

import { toast } from "react-toastify";

export function AddItemToWishlist(item: ShopItem) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Function to remove item from cart
  function addItemToWishlist() {
    dispatch(addToWishlist(item));

    toast.success("Item added to wishlist");
  }

  return addItemToWishlist;
}
