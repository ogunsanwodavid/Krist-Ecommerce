import { useAppDispatch } from "@/app/hooks/redux";

import { addToCart } from "@/app/redux/cartSlice";

import { useItemVariationModal } from "@/app/(main)/contexts/ItemVariationModalContext";

import { ShopItem } from "@/app/models/shop";

export function useAddItemToCart(item: ShopItem, quantity?: number) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Function from item variation modal context
  const { openVariationModal } = useItemVariationModal();

  //Set quantity to 1 if it doesnt exist
  const itemQuantity = quantity ? quantity : 1;

  //Check if item has size or color variations
  const itemHasSizeVariation =
    Array.isArray(item?.sizesAvailable) && item?.sizesAvailable.length > 0;
  const itemHasColorVariation =
    Array.isArray(item?.colorsAvailable) && item?.colorsAvailable.length > 0;

  //Function to add item to cart
  function addItemToCart() {
    if (itemHasSizeVariation || itemHasColorVariation) {
      openVariationModal(item, itemQuantity);
    } else {
      dispatch(addToCart({ quantity: itemQuantity, item: item }));
    }
  }

  return addItemToCart;
}
