"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useCheckout } from "../contexts/CheckoutContext";

export default function CheckoutReview() {
  //Checkout context variables
  const { deliveryAddress, paymentMethod, paymentCard } = useCheckout();

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

  return (
    <div>
      {/** Header */}
      <header className="space-y-1">
        <h3 className="text-[18px] font-semibold md:text-[20px]">
          Estimated delivery: 22 Feb 2025
        </h3>
      </header>
    </div>
  );
}
