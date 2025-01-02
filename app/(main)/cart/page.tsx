"use client";

import Image from "next/image";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import MainButton from "@/app/components/ui/MainButton";

import CartSummary from "@/app/components/CartSummary";

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
    <div className="space-y-3 md:space-y-5">
      {/** Header */}
      <header>
        <h2 className="text-black text-[23px] md:text-3xl">Cart</h2>
      </header>

      {/** Main section */}
      <main>
        {/** Cart Summary */}
        <CartSummary>
          {/** Checkout button */}
          <Link
            href={
              effectiveDiscountCode
                ? `/checkout?discountCode=${effectiveDiscountCode}`
                : "/checkout"
            }
            className="hidden lg:block"
          >
            <button className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[15px]">
              Proceed to Checkout
            </button>
          </Link>
        </CartSummary>
      </main>
    </div>
  );
}
