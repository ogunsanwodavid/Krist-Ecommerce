"use client";

import Image from "next/image";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import MainButton from "@/app/components/ui/MainButton";

import CartSummary from "@/app/components/CartSummary";

import { formatToSupabaseImageUrl } from "@/app/lib/supabase";

import { RemoveItemFromCart } from "@/app/actions/cart/RemoveItemFromCart";
import { IncreaseItemQuantity } from "@/app/actions/cart/IncreaseItemQuantity";
import { DecreaseItemQuantity } from "@/app/actions/cart/DecreaseItemQuantity";

import { formatToCurrency } from "@/app/utils/helpers";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

import failedToLoadImg from "@/public/failedToLoad.svg";

export default function Cart() {
  const searchParams = useSearchParams();

  //Cart Products from redux state
  const cartProducts = useAppSelector(
    (state: ReduxStoreState) => state.cart.cart
  );

  //Effective discount code from params
  const effectiveDiscountCode = searchParams.get("discountCode");

  //Show error if there is no cart product to display
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
        <Image
          src={failedToLoadImg}
          className="w-full max-w-[200px] md:max-w-[300px]"
          alt="Failed to load error image"
        />
        <p className="text-base text-center md:text-lg">
          Your cart is currently empty.
        </p>
        <Link href="/shop">
          <MainButton>Start Shopping</MainButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-[600px] mx-auto pb-10 md:space-y-5 lg:pb-16 lg:max-w-none">
      {/** Header */}
      <header>
        <h2 className="text-black text-[23px] md:text-3xl">Cart</h2>
      </header>

      {/** Main section */}
      <main className="lg:flex lg:flex-row-reverse lg:gap-x-[60px]">
        {/** Cart Summary */}
        <CartSummary>
          {/** Checkout button */}
          <Link
            href={
              effectiveDiscountCode
                ? `/checkout?discountCode=${effectiveDiscountCode}`
                : "/checkout"
            }
            className="hidden px-3 pt-1 pb-3 lg:block"
          >
            <button className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[15px] lg:text-base">
              Proceed to Checkout
            </button>
          </Link>
        </CartSummary>

        {/** Cart products list */}
        <section className="w-full h-max mt-5 lg:mt-0">
          {/** Table header for large screens */}
          <header className="hidden py-2 px-3 lg:grid grid-cols-[auto_100px_120px_120px_16px] gap-4 text-base">
            <p>Products</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
            <p className="opacity-0">Del</p>
          </header>

          {/** Main section */}
          <main className="border-b-[2px] border-gray-200">
            {cartProducts.map((product, index) => {
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

              //Product subtotal
              const productSubtotal = productPrice * product.quantity;

              //Handle product deletion
              const removeItemFromCart = RemoveItemFromCart(
                product.item.id,
                productSize,
                productColor
              );

              function handleRemoveItem() {
                removeItemFromCart();
              }

              //Handle product quantity increment
              const increaseItemQuantity = IncreaseItemQuantity(
                product.item.id,
                productSize,
                productColor
              );

              function handleIncreaseItemQuantity() {
                increaseItemQuantity();
              }

              //Handle product quantity decrement
              const decreaseItemQuantity = DecreaseItemQuantity(
                product.item.id,
                productSize,
                productColor
              );

              function handleDecreaseItemQuantity() {
                decreaseItemQuantity();
              }

              return (
                <div
                  className="py-4 px-3 space-y-2 border-t-[2px] border-gray-200 lg:space-y-0 lg:flex lg:gap-4 lg:justify-between"
                  key={index}
                >
                  <section className="grid grid-cols-[90px_auto] gap-2 lg:grid-cols-[60px_auto] lg:gap-4">
                    {/** Image */}
                    <div className="relative w-[90px] h-[90px] rounded-[6px] overflow-hidden lg:h-[60px] lg:w-[60px]">
                      <Image
                        src={productImageUrl}
                        alt={product.item.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/** Details */}
                    <div className="space-y-1">
                      {/** Title */}
                      <p className="w-full line-clamp-1 text-ellipsis overflow-hidden font-semibold text-[15px] md:text-[16px]">
                        {product.item.title}
                      </p>

                      {/** Quantity and price */}
                      <p className=" text-[14px] md:text-[15px] lg:hidden">
                        <span className="font-roboto">₦</span>
                        {formatToCurrency(productPrice)}
                      </p>

                      {/** Size and color */}
                      {(productSize || productColor) && (
                        <p className="line-clamp-1 text-ellipsis overflow-hidden text-[14px] space-x-1 capitalize md:text-[15px]">
                          {productSize && <span>Size: {productSize}, </span>}

                          {productColor && <span>Color: {productColor}</span>}
                        </p>
                      )}
                    </div>
                  </section>

                  <section className="w-full flex items-center justify-between lg:w-max lg:gap-4 lg:grid lg:grid-cols-[100px_120px_120px_16px] lg:justify-between">
                    {/** Price */}
                    <p className="hidden lg:block lg:w-[100px]">
                      <span className="font-roboto">₦</span>
                      {formatToCurrency(productPrice)}
                    </p>

                    {/** Item quantity */}
                    <div className="h-[40px] w-[100px] rounded-[8px] py-1 px-2 border-[2px] border-black flex items-center justify-between md:h-[44px] lg:w-[120px]">
                      <FaMinus
                        className="text-black text-[12px]"
                        onClick={handleDecreaseItemQuantity}
                      />

                      <span className="text-[15px] md:text-[17px]">
                        {product.quantity}
                      </span>

                      <FaPlus
                        className="text-black text-[12px]"
                        onClick={handleIncreaseItemQuantity}
                      />
                    </div>

                    {/** Subtotal */}
                    <p className="hidden lg:block lg:w-[120px]">
                      {" "}
                      <span className="font-roboto">₦</span>
                      {formatToCurrency(productSubtotal)}
                    </p>

                    {/** Delete icon */}
                    <div
                      className="w-max flex gap-x-1 items-center text-[15px] text-errorRed cursor-pointer md:text-[16px] lg:gap-x-0 lg:w-[16px]"
                      onClick={handleRemoveItem}
                    >
                      <FaRegTrashAlt className="text-errorRed lg:text-base" />
                      <p className="lg:hidden">Remove</p>
                    </div>
                  </section>
                </div>
              );
            })}
          </main>
        </section>

        {/** Checkout button */}
        <Link
          href={
            effectiveDiscountCode
              ? `/checkout?discountCode=${effectiveDiscountCode}`
              : "/checkout"
          }
          className="block mt-3 sticky bottom-2 px-0 pb-3 lg:hidden"
        >
          <button className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[17px]">
            Proceed to Checkout
          </button>
        </Link>
      </main>
    </div>
  );
}
