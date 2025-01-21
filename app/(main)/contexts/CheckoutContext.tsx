"use client";

import { createContext, useState, useContext } from "react";

import { setCart } from "@/app/redux/cartSlice";

import { useAppDispatch } from "@/app/hooks/redux";

import { Address } from "@/app/models/addresses";

import { Card } from "@/app/models/cards";

import OrderCompletedModal from "../checkout/components/OrderCompletedModal";

interface CheckoutContextType {
  deliveryAddress: Address | null;
  setDeliveryAddress: (arg: Address | null) => void;
  paymentMethod: string;
  setPaymentMethod: (arg: string) => void;
  paymentCard: Card | null;
  setPaymentCard: (arg: Card | null) => void;
  openOrderCompletedModal: () => void;
  closeOrderCompletedModal: () => void;
  isPlacingOrder: boolean;
  setIsPlacingOrder: (arg: boolean) => void;
}

interface CheckoutProviderProps {
  children: React.ReactNode;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Checkout variables
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentCard, setPaymentCard] = useState<Card | null>(null);
  const [isOrderCompletedModalOpen, setIsOrderCompletedModalOpen] =
    useState<boolean>(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  //Function to open order completed modal
  function openOrderCompletedModal() {
    setIsOrderCompletedModalOpen(true);
  }

  //Function to close order completed modal
  function closeOrderCompletedModal() {
    setIsOrderCompletedModalOpen(false);

    //Reset variables
    setDeliveryAddress(null);
    setPaymentMethod("");
    setPaymentCard(null);

    //Empty cart
    dispatch(setCart([]));
  }

  return (
    <CheckoutContext.Provider
      value={{
        deliveryAddress,
        setDeliveryAddress,
        paymentMethod,
        setPaymentMethod,
        paymentCard,
        setPaymentCard,
        openOrderCompletedModal,
        closeOrderCompletedModal,
        isPlacingOrder,
        setIsPlacingOrder,
      }}
    >
      {children}

      {/** Render order completed modal */}
      {isOrderCompletedModalOpen && <OrderCompletedModal />}
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
