import { addToCart } from "@/app/redux/cartSlice";

import { useItemVariationModal } from "@/app/(main)/contexts/ItemVariationModalContext";

import { ShopItem } from "@/app/models/shop";

export function useAddItemToCart(item: ShopItem, quantity?: number) {
  //Function from item variation modal context
  const { openVariationModal } = useItemVariationModal();

  //Set quantity to 1 if it doesnt exist
  const itemQuantity = quantity ? quantity : 1;

  //Check if item has size or color variations
  const itemHasSizeVariation =
    Array.isArray(item?.sizesAvailable) && item?.sizesAvailable.length > 0;
  const itemHasColorVariation =
    Array.isArray(item?.colorsAvailable) && item?.colorsAvailable.length < 0;

  function addItemToCart() {
    if (itemHasSizeVariation || itemHasColorVariation) {
      openVariationModal(item, itemQuantity);
    } else {
      addToCart({ quantity: itemQuantity, item: item });
    }
  }

  return addItemToCart;
}
