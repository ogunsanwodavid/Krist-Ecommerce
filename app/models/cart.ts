import { ShopItem } from "./shop";

export interface CartProduct {
  quantity: number;
  item: ShopItem;
  size?: string;
  color?: string;
}

export interface CartState {
  cart: CartProduct[];
}
