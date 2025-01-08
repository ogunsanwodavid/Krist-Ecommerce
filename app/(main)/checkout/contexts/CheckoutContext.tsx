"use client";

import { createContext, useState, useContext } from "react";

import { Address } from "@/app/models/addresses";
import { Card } from "@/app/models/cards";

interface CheckoutContextType {
  deliveryAddress: Address | null;
  setDeliveryAddress: (arg: Address) => void;
  paymentMethod: string;
  setPaymentMethod: (arg: string) => void;
  paymentCard: Card | null;
  setPaymentCard: (arg: Card) => void;
}

interface CheckoutProviderProps {
  children: React.ReactNode;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentCard, setPaymentCard] = useState<Card | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        deliveryAddress,
        setDeliveryAddress,
        paymentMethod,
        setPaymentMethod,
        paymentCard,
        setPaymentCard,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within an CheckoutProvider");
  }
  return context;
};
