import { CartProduct } from "./cart";

export interface Order {
  deliveryTime: Date;
  product: CartProduct;
}

export interface OrdersState {
  orders: Order[];
}
