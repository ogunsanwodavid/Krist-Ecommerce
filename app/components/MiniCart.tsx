import Image from "next/image";
import Link from "next/link";

import { ReduxStoreState } from "../redux/store";

import { useAppSelector } from "../hooks/redux";

import { formatToSupabaseImageUrl } from "../lib/supabase";

import { FaRegTrashAlt } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { formatToCurrency } from "../utils/helpers";
import { RemoveItemFromCart } from "../actions/cart/RemoveItemFromCart";

interface MiniCartProps {
  setIsMiniCartOpen: (isOpen: boolean) => void;
}

export default function MiniCart({ setIsMiniCartOpen }: MiniCartProps) {
  //Router function
  const router = useRouter();

  //Cart Products from redux state
  const cartProducts = useAppSelector(
    (state: ReduxStoreState) => state.cart.cart
  );

  //Number of products in the cart
  const cartProductsCount = cartProducts.length;

  //Subtotal of cart products
  const cartSubTotal = cartProducts
    .map((product) => {
      const productQuantity = product.quantity;

      // Calculate the effective price per product, considering discount
      const productPrice = product.item.discount
        ? product.item.price - product.item.discount
        : product.item.price;

      // Return the total price for this product
      return productPrice * productQuantity;
    })
    .reduce((acc, curr) => acc + curr, 0); // Sum up all the product totals

  //Function to view full cart
  function handleViewCart() {
    //Close minicart
    setIsMiniCartOpen(false);

    //Navigate to cart page
    router.push("/cart");
  }

  //Function to checkout
  function handleCheckout() {
    //Close minicart
    setIsMiniCartOpen(false);

    //Navigate to checkout page
    router.push("/checkout");
  }

  return (
    <div className="absolute top-[calc(100%_+_6px)] -right-3 w-[300px] py-4 bg-white shadow-md border-[2px] border-gray-50 text-black">
      {/** Item count */}
      <p className="text-[15px] px-3">
        You have {cartProductsCount} {cartProductsCount > 1 ? "items" : "item"}{" "}
        in your cart
      </p>

      {/** Cart items */}
      {/** Displays only the first three */}
      <main className="mt-2 px-3">
        {cartProducts.slice(0, 3).map((product, index) => {
          //Supabase url for the product image
          const productImageUrl = formatToSupabaseImageUrl(
            "productImages",
            product.item.image
          );

          //Product's price
          const productPrice = product.item.discount
            ? product.item.price - product.item.discount
            : product.item.price;

          //Product's size and color
          const productSize = product.size;
          const productColor = product.color;

          //Function to handle product deletion
          const removeItemFromCart = RemoveItemFromCart(
            product.item.id,
            productSize,
            productColor
          );

          function handleRemoveItem() {
            removeItemFromCart();
          }

          return (
            <div
              className="w-full grid grid-cols-[40px_auto_16px] items-center gap-3 py-3 border-b-[1px] border-gray-100"
              key={index}
            >
              {/** Item image */}
              <div className="relative w-[40px] h-[40px] overflow-hidden">
                <Image
                  src={productImageUrl}
                  alt={product.item.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/** Item details */}
              <div className=" space-y-2">
                {/** Title */}
                <p className="w-full line-clamp-1 text-ellipsis overflow-hidden text-[15px] leading-[15px]">
                  {product.item.title}
                </p>

                {/** Quantity and price */}
                <p className="font-semibold text-[14px] leading-[14px]">
                  {product.quantity} &times;
                  <span className="ml-1 font-roboto">₦</span>
                  {formatToCurrency(productPrice)}
                </p>

                {/** Size and color */}
                {(productSize || productColor) && (
                  <p className="line-clamp-1 text-ellipsis overflow-hidden text-[14px] leading-[14px] space-x-1 capitalize">
                    {productSize && <span>Size: {productSize}, </span>}

                    {productColor && <span>Color: {productColor}</span>}
                  </p>
                )}
              </div>

              {/** Delete icon */}
              <div className="w-[30px] h-full flex">
                <FaRegTrashAlt
                  className="mt-auto text-errorRed text-[16px]"
                  onClick={handleRemoveItem}
                />
              </div>
            </div>
          );
        })}
      </main>

      {/** More icon
       * displays if there are more than 3 items in cart and
       * takes the user to the cart page
       */}
      {cartProductsCount > 3 && (
        <div className="block w-full mt-2 px-3" onClick={handleViewCart}>
          <FiMoreHorizontal className="ml-auto text-black" />
        </div>
      )}

      {/** Cart subtotal */}
      <section className="flex justify-between items-center px-3 mt-3 text-base font-semibold">
        <p>Subtotal:</p>
        <p>
          <span className="font-roboto">₦</span>
          {formatToCurrency(cartSubTotal)}
        </p>
      </section>

      {/** Buttons */}
      <section className="px-3 mt-2 space-y-2">
        {/** View Cart */}
        <button
          className="w-full h-max px-3 py-2 text-black border-[2px] border-black items-center justify-center rounded-[7px] z-10 text-[15px]"
          onClick={handleViewCart}
        >
          View Cart
        </button>

        {/** Checkout */}
        <button
          className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[15px]"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </section>
    </div>
  );
}
