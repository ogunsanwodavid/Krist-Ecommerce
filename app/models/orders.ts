import { CartProduct } from "./cart";

export interface Order {
  id: string;
  deliveryDate: string;
  product: CartProduct;
}

export interface OrdersState {
  orders: Order[];
}
