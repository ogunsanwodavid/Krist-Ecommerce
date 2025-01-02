import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useAppSelector } from "../hooks/redux";

import { ReduxStoreState } from "../redux/store";

import { formatToCurrency } from "../utils/helpers";

export default function CartSummary({
  children,
}: {
  children?: React.ReactNode;
}) {
  //Router function
  const router = useRouter();

  //Search parameters
  const searchParams = useSearchParams();

  //Cart Products from redux state
  const cartProducts = useAppSelector(
    (state: ReduxStoreState) => state.cart.cart
  );

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

  //Deliver charge
  const deliveryCharge = 4000;

  //Discount codes and effective discount percentages
  const discountCodes = [
    {
      code: "00XDAVE",
      discountPercentage: 15,
    },
    { code: "DEV001", discountPercentage: 18 },
    {
      code: "MTG969",
      discountPercentage: 20,
    },
  ];

  //Effective discount code from params
  const effectiveDiscountCode = searchParams.get("discountCode");

  //State of discount code in input
  const [discountCode, setDiscountCode] = useState(effectiveDiscountCode ?? "");

  //Apply discount code - to route query
  function handleApplyDiscountCode() {
    // Create a new URLSearchParams object to modify the query string
    const params = new URLSearchParams(searchParams);

    params.set("discountCode", discountCode);

    // Push the new URL with updated query params
    router.push(`?${params.toString()}`);
  }

  //Effective discount percentage
  const effectiveDiscountPercentage = discountCodes.find(
    (code) => code.code === effectiveDiscountCode
  )?.discountPercentage;

  //Effective discount
  const effectiveDiscount = effectiveDiscountPercentage
    ? cartSubTotal * (effectiveDiscountPercentage / 100)
    : 0;

  //Grand total
  const grandTotal = cartSubTotal + deliveryCharge - effectiveDiscount;

  return (
    <div className="bg-white shadow-xl border-[2px] border-gray-50 lg:w-[330px] lg:shrink-0">
      {/** Cart subtotal */}
      <section className="flex justify-between items-center px-3 py-3 text-[15px] font-semibold border-b-[1.5px] border-b-gray-100 md:text-base">
        <p>Subtotal</p>
        <p>
          <span className="font-roboto">₦</span>
          {formatToCurrency(cartSubTotal)}
        </p>
      </section>

      {/** Charges and discount */}
      <section className="px-3 py-3 text-[15px] border-b-[1.5px] border-b-gray-100 space-y-2 md:text-base">
        {/** Discount code */}
        <div className="space-y-1">
          <p className="text-[14px] md:text-[15px]">Enter discount code</p>

          <main className="border-[2px] border-black flex items-center rounded-[6px] overflow-hidden">
            {/** Input */}
            <input
              type="text"
              value={discountCode}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters
                setDiscountCode(filteredValue);
              }}
              className="w-full p-2 text-[15px] md:text-base"
            />

            {/** Apply discount buton */}
            <button
              className="px-4 py-2 bg-black text-white text-[15px] md:text-base "
              disabled={!discountCode}
              onClick={handleApplyDiscountCode}
            >
              Apply
            </button>
          </main>
        </div>

        {/** Delivery charge */}
        {deliveryCharge && (
          <div className="flex justify-between items-center text-[14px] md:text-[15px]">
            <p>Delivery charge</p>
            <p>
              <span>+</span>
              <span className="ml-1 font-roboto">₦</span>
              {formatToCurrency(deliveryCharge)}
            </p>
          </div>
        )}

        {/** Discount */}
        {effectiveDiscount > 0 && (
          <div className="flex justify-between items-center text-[14px] md:text-[15px]">
            <p>Discount</p>
            <p>
              <span>-</span>
              <span className="ml-1 font-roboto">₦</span>
              {formatToCurrency(effectiveDiscount)}
            </p>
          </div>
        )}
      </section>

      {/** Cart grandtotal */}
      <section className="flex justify-between items-center px-3 py-3 text-[15px] font-semibold md:text-[16px]">
        <p>Grand Total</p>
        <p>
          <span className="font-roboto">₦</span>
          {formatToCurrency(grandTotal)}
        </p>
      </section>

      {/** Children */}
      <div>{children}</div>
    </div>
  );
}
