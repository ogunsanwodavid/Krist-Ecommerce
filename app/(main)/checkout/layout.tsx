"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { useAuth } from "@/contexts/AuthContext";

import { useCheckout } from "../contexts/CheckoutContext";

import usePlaceOrder from "./actions/usePlaceOrder";

import { CircularProgress } from "@mui/material";

import MainButton from "@/app/components/ui/MainButton";

import CartSummary from "@/app/components/CartSummary";
import CheckoutProgress from "./components/CheckoutProgress";

import failedToLoadImg from "@/public/failedToLoad.svg";
import authErrorImg from "@/public/authError.svg";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Pathname function
  const pathname = usePathname();

  //Check current active page
  const isAddressPage = pathname.startsWith("/checkout/address");
  const isPaymentPage = pathname.startsWith("/checkout/payment");
  const isReviewPage = pathname.startsWith("/checkout/review");

  //Auth context variables
  const { isAuthenticated, isGettingUser } = useAuth();

  //Cart Products from redux state
  const cartProducts = useAppSelector(
    (state: ReduxStoreState) => state.cart.cart
  );

  //Checkout context variables
  const { openOrderCompletedModal } = useCheckout();

  //Place order function
  const placeOrder = usePlaceOrder();

  //Show error if there is no cart product to checkout
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 pt-3 pb-9 text-black lg:pt-6 lg:pb-12">
        <Image
          src={failedToLoadImg}
          className="w-full max-w-[200px] md:max-w-[300px]"
          alt="Failed to load error image"
        />
        <p className="text-base text-center md:text-lg">
          Your cart is empty. Add some items before proceeding to checkout.
        </p>
        <Link href="/shop">
          <MainButton>Start Shopping</MainButton>
        </Link>
      </div>
    );
  }

  //Return loader when getting user
  if (isGettingUser) {
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }

  //Show error if user isnt authenticated
  if (!isAuthenticated && !isGettingUser) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 py-9 text-black lg:py-12">
        <Image
          src={authErrorImg}
          className="w-full max-w-[200px] md:max-w-[300px]"
          alt="auth error image"
        />
        <p className="text-base text-center md:text-lg">
          You need to be authenticated to checkout.
        </p>

        {/** Buttons */}
        <section className="flex items-center justify-center flex-wrap gap-2">
          {/** Login */}
          <Link href="/login">
            <MainButton className="!bg-white !text-black border-[1.5px] border-black !px-7 lg:!px-12">
              Login
            </MainButton>
          </Link>

          {/** Signup */}
          <Link href="/signup">
            <MainButton className="!px-7 lg:!px-12">Signup</MainButton>
          </Link>
        </section>
      </div>
    );
  }

  //Handle place order
  function handlePlaceOrder() {
    //Open order completed modal
    openOrderCompletedModal();

    //Place order
    placeOrder();
  }

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-3 py-8 md:px-6 md:py-10 space-y-3 lg:px-0 lg:space-y-5">
      {/** Inner container */}
      <div className="space-y-3 max-w-[600px] mx-auto pb-10 md:space-y-5 lg:pb-16 lg:max-w-none">
        {/**
         *Header
         *Content depends on the current page
         */}
        <header>
          <h2 className="text-black text-[23px] md:text-3xl">
            {isAddressPage
              ? "Shipping Address"
              : isPaymentPage
              ? "Payment Method"
              : "Review Your Order"}
          </h2>
        </header>

        {/** Main section */}
        <main className="lg:flex lg:flex-row-reverse lg:gap-x-[60px]">
          {/** Cart Summary */}
          <CartSummary>
            {/** Place Order button */}
            <div
              className={`hidden px-3 pt-1 pb-3 ${
                isReviewPage ? "lg:block" : "lg:hidden"
              }`}
              onClick={handlePlaceOrder}
            >
              <button className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[15px] lg:text-base">
                Place Order
              </button>
            </div>
          </CartSummary>

          {/** Content */}
          <section className="w-full h-max mt-5 space-y-4 lg:mt-0 lg:space-y-7">
            {/** Checkout progress */}
            <CheckoutProgress />

            {/** Children */}
            <div>{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
