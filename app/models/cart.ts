import { ShopItem } from "./shop";

export interface CartItem {
  quantity: number;
  item: ShopItem;
  size?: string;
  color?: string;
}
