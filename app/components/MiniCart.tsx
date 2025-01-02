import { ReduxStoreState } from "../redux/store";

import { useAppSelector } from "../hooks/redux";

export default function MiniCart() {
  //Cart Items from redux state
  const cartItems = useAppSelector((state: ReduxStoreState) => state.cart.cart);

  //Number of items in the cart
  const cartItemsCount = cartItems.length;

  return (
    <div className="absolute top-full -right-3 mt-3 w-[300px] h-[200px] bg-white p-3 shadow-md border-[2px] border-gray-50"></div>
  );
}
