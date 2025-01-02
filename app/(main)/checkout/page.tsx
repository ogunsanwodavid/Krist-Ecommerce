"use client";

import { redirect, useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  // Search parameters
  const searchParams = useSearchParams();

  // Effective discount code from params
  const effectiveDiscountCode = searchParams.get("discountCode");

  // Redirect to the appropriate URL
  if (effectiveDiscountCode) {
    redirect(`/checkout/address?discountCode=${effectiveDiscountCode}`);
  } else {
    redirect("/checkout/address");
  }
}
