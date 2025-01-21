"use client";

import { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { formatToSupabaseImageUrl } from "@/app/lib/supabase";

import { formatToCurrency } from "@/app/utils/helpers";

import { useCheckout } from "../../contexts/CheckoutContext";

import usePlaceOrder from "../actions/usePlaceOrder";

import { CircularProgress } from "@mui/material";

import { FiEdit } from "react-icons/fi";

export default function CheckoutReview() {
  //Checkout context variables
  const {
    deliveryAddress,
    paymentMethod,
    paymentCard,
    openOrderCompletedModal,
    isPlacingOrder,
    setIsPlacingOrder,
  } = useCheckout();

  //Router function
  const router = useRouter();

  //Route to address page if no address
  //and payment if no payment credentials
  useEffect(() => {
    if (!deliveryAddress) {
      router.push("/checkout/address");
    } else if (
      deliveryAddress &&
      !(
        (paymentMethod !== "card" && paymentMethod) ||
        (paymentMethod === "card" && paymentCard)
      )
    ) {
      router.push("/checkout/payment");
    }
  }, [deliveryAddress, paymentMethod, paymentCard]);

  //Estimated delivery date : 24 hours from current time
  const estimatedDeliveryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Format the date
  const day = estimatedDeliveryDate.getDate();
  const month = estimatedDeliveryDate.toLocaleString("default", {
    month: "long",
  });
  const year = estimatedDeliveryDate.getFullYear();

  const formattedDeliveryDate = `${day} ${month}, ${year}`;

  //Cart Products from redux state
  const cartProducts = useAppSelector(
    (state: ReduxStoreState) => state.cart.cart
  );

  //Format card number
  function formatNumberWithDotsAndSpaces(number: string | undefined) {
    if (!number) return;

    if (number.length <= 2) {
      return number; // If the number has 2 or fewer digits, return it as-is
    }

    const maskedPart = ".".repeat(number.length - 2); // Dots for all except the last 2 digits
    const visiblePart = number.slice(-2); // Get the last 2 digits

    const combined = maskedPart + visiblePart; // Combine dots and last 2 digits

    // Add spaces every 4 characters
    const formattedWithSpaces = combined
      .replace(/.{1,4}/g, (chunk) => chunk + " ")
      .trim();

    return formattedWithSpaces;
  }

  //Place order function
  const placeOrder = usePlaceOrder();

  //Handle place holder
  function handlePlaceOrder() {
    // Set isPlacingOrder to true
    setIsPlacingOrder(true);

    // Wait for 2 seconds
    setTimeout(() => {
      // Open order completed modal
      openOrderCompletedModal();

      // Place order
      placeOrder();

      // Reset isPlacingOrder to false
      setIsPlacingOrder(false);
    }, 2000);
  }

  return (
    <div>
      {/** Header */}
      <header className="space-y-1">
        <h3 className="text-[18px] font-semibold md:text-[20px]">
          Estimated delivery: {formattedDeliveryDate}
        </h3>
      </header>

      {/** Cart products */}
      <section className="mt-4">
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

          return (
            <main
              className="py-3 border-b-[2px] border-b-gray-200 grid grid-cols-[90px_auto] gap-3 lg:gap-5"
              key={index}
            >
              {/** Image */}
              <div className="relative w-[90px] h-[90px] rounded-[6px] overflow-hidden">
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
                <p className="w-full line-clamp-1 text-ellipsis overflow-hidden font-semibold text-[16px] md:text-[17px]">
                  {product.item.title}
                </p>

                {/** Quantity and price */}
                <p className=" text-[15px] md:text-[16px]">
                  <span className="font-roboto">₦</span>
                  {formatToCurrency(productSubtotal)} (Qty: {product.quantity})
                </p>

                {/** Size and color */}
                {(productSize || productColor) && (
                  <p className="line-clamp-1 text-ellipsis overflow-hidden text-[15px] space-x-1 capitalize md:text-[16px]">
                    {productSize && <span>Size: {productSize}, </span>}

                    {productColor && <span>Color: {productColor}</span>}
                  </p>
                )}
              </div>
            </main>
          );
        })}
      </section>

      {/** Shipping address */}
      <section className="py-4 border-b-2 border-b-gray-200 space-y-3 lg:py-6">
        {/** Header */}
        <h5 className="text-[17.5px] font-semibold md:text-[19.5px]">
          Shipping address
        </h5>

        {/** Main */}
        <main className="flex justify-between gap-x-2">
          {/** Details */}
          <div className="space-y-2">
            <p className="font-medium text-[17px] md:text-[19px]">
              {deliveryAddress?.name}
            </p>

            <p className="text-[16px] md:text-[18px]">
              {deliveryAddress?.houseNumber}, {deliveryAddress?.lga},{" "}
              {deliveryAddress?.state} state.
            </p>
          </div>

          {/** Edit button */}
          <Link
            href="/checkout/address"
            className="w-max h-max shrink-0 bg-gray-100 rounded-[8px] p-2 flex items-center justify-center cursor-pointer"
          >
            <FiEdit className="text-black text-[16px] md:text-lg" />
          </Link>
        </main>
      </section>

      {/** Payment method */}
      <section className="py-4 border-b-2 border-b-gray-200 space-y-3 lg:py-6">
        {/** Header */}
        <h5 className="text-[17.5px] font-semibold md:text-[19.5px]">
          Payment Method
        </h5>

        {/** Main */}
        <main className="flex justify-between gap-x-2">
          {/** Details */}
          <p className="font-medium text-[17px] md:text-[19px]">
            {paymentMethod === "card"
              ? `Debit Card (${formatNumberWithDotsAndSpaces(
                  paymentCard?.number
                )})`
              : paymentMethod === "googlePay"
              ? "Google Pay"
              : paymentMethod === "paypal"
              ? "Paypal"
              : "Cash on Delivery"}
          </p>

          {/** Edit button */}
          <Link
            href="/checkout/payment"
            className="w-max h-max shrink-0 bg-gray-100 rounded-[8px] p-2 flex items-center justify-center cursor-pointer"
          >
            <FiEdit className="text-black text-[16px] md:text-lg" />
          </Link>
        </main>
      </section>

      {/** Place order button */}
      <div
        className="block mt-4 sticky bottom-2 px-0 pb-3 lg:hidden"
        onClick={handlePlaceOrder}
      >
        <button className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[17px]">
          {isPlacingOrder ? (
            <CircularProgress color="inherit" size={17} />
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}
