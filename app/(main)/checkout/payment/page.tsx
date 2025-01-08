"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { removeCard } from "@/app/redux/cardsSlice";

import { useNewCardModal } from "../../contexts/NewCardModalContext";

import { useCheckout } from "../../contexts/CheckoutContext";

import { formatCardNumber } from "@/app/utils/helpers";

import MainButton from "@/app/components/ui/MainButton";

import { FaCheck } from "react-icons/fa6";

import { FaRegTrashAlt } from "react-icons/fa";

import noCardImg from "@/public/noCard.svg";
import visaLogo from "@/public/visa-logo.svg";
import mastercardLogo from "@/public/mastercard-logo.svg";
import amexLogo from "@/public/amex-logo.svg";

export default function CheckoutPayment() {
  //Checkout context variables
  const {
    paymentMethod,
    deliveryAddress,
    setPaymentMethod,
    paymentCard,
    setPaymentCard,
  } = useCheckout();

  //Router function
  const router = useRouter();

  //Route to address page if no address
  useEffect(() => {
    if (!deliveryAddress) {
      router.push("/checkout/address");
    }
  }, [deliveryAddress]);

  //New Card modal variables
  const { openNewCardModal } = useNewCardModal();

  //Saved cards from the redux state
  const savedCards = useAppSelector(
    (state: ReduxStoreState) => state.cards.cards
  );

  //State of the id of selected payment card
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  //Set id on mount based on default address
  useEffect(() => {
    // Find the first address with default: true
    const defaultCard = savedCards.find((card) => card.default);

    // If a default card exists, set its id
    if (defaultCard) {
      setSelectedCardId(defaultCard.id);
    }
  }, [savedCards]);

  // When selectedCardId changes, update the selected payment card
  useEffect(() => {
    const selectedCard = savedCards.find((card) => card.id === selectedCardId);

    if (selectedCard) {
      setPaymentCard(selectedCard);
    } else {
      setPaymentCard(null);
    }
  }, [selectedCardId, savedCards, setPaymentCard]);

  //Dispatch function
  const dispatch = useAppDispatch();

  //Search parameters
  const searchParams = useSearchParams();

  //Effective discount code from params
  const effectiveDiscountCode = searchParams.get("discountCode");

  return (
    <div>
      {/** Header */}
      <header className="space-y-1">
        <h3 className="text-[19px] font-semibold md:text-[21px]">
          Select a payment method
        </h3>
      </header>

      {/** List of payment methods */}
      <main className="mt-2">
        {/** Debit / credit card */}
        <section
          className="py-4 border-b-[1.5px] border-b-gray-200 lg:py-5"
          onClick={() => setPaymentMethod("card")}
        >
          {/** Debit / credit card radio */}
          <label className="flex items-center gap-x-3" htmlFor="card">
            {/* Custom Radio */}
            <div className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-full ">
              {paymentMethod === "card" && (
                <div className="shrink-0 h-2 w-2 bg-black rounded-full"></div>
              )}
            </div>

            <span className="text-[17px] md:text-[19px]">
              <span className="font-medium">Debit/Credit card</span>
            </span>
          </label>

          {/** Saved cards */}
          {paymentMethod === "card" && (
            <>
              {savedCards.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
                  <Image
                    src={noCardImg}
                    className="w-full max-w-[200px] md:max-w-[260px]"
                    alt="Failed to load error image"
                  />
                  <p className="text-base text-center md:text-lg">
                    You haven&apos;t added any debit/credit card yet.
                  </p>
                </div>
              ) : (
                <section className="space-y-5 mt-3">
                  <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
                    {savedCards.map((card) => {
                      //Card type
                      const cardType = card.type;

                      //Function to mask card name
                      function maskName(name: string): string {
                        // Trim the input and split into words
                        const words = name.trim().split(/\s+/);

                        // Mask each word
                        const maskedWords = words.map((word) => {
                          if (word.length === 0) return ""; // Handle empty strings
                          return word.charAt(0) + "****"; // Keep the first character and mask the rest
                        });

                        // Join the masked words into a single string
                        return maskedWords.join(" ");
                      }

                      //Function when clicked
                      function handleClick() {
                        setSelectedCardId(card.id);
                      }

                      //Function to delete card from redux state
                      function handleDelete(e: React.MouseEvent) {
                        e.preventDefault();

                        dispatch(removeCard(card.id));
                      }

                      return (
                        <section
                          className="p-5 bg-gray-100 rounded-[10px] space-y-3 cursor-pointer"
                          key={card.id}
                          onClick={handleClick}
                        >
                          {/** Card checkbox */}
                          <label
                            className="flex items-center justify-between"
                            htmlFor={card.id}
                          >
                            {/*** Hidden input */}
                            <input
                              type="checkbox"
                              name={card.id}
                              id={card.id}
                              checked={selectedCardId === card.id}
                              className="hidden peer"
                            />

                            {/** Card type image */}
                            <div className="w-max flex items-center justify-center rounded-[6px]">
                              <Image
                                src={
                                  cardType === "visa"
                                    ? visaLogo
                                    : cardType === "mastercard"
                                    ? mastercardLogo
                                    : amexLogo
                                }
                                className="h-[20px] lg:h-[25px]"
                                alt={`${cardType}'s logo`}
                                width={40}
                                height={20}
                              />
                            </div>

                            {/* Custom Checkbox */}
                            <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black">
                              <FaCheck className="text-white text-[0.6rem]" />
                            </span>
                          </label>

                          {/** Card name */}
                          <p className="text-[15px] font-semibold md:text-[17px]">
                            {maskName(card.name)}
                          </p>

                          {/** Card number */}
                          <p className="text-[15px] md:text-[17px]">
                            {formatCardNumber(card.number)}
                          </p>

                          {/** Delete button */}
                          <div
                            className="w-max ml-auto rounded-[5px] text-errorRed cursor-pointer lg:bg-[rgba(229,77,81,0.2)] lg:px-5 lg:py-1 lg:flex lg:items-center lg:gap-x-2"
                            onClick={handleDelete}
                          >
                            <FaRegTrashAlt className="text-[16px]" />
                            <p className="hidden md:text-[17px] lg:block">
                              Delete
                            </p>
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </section>
              )}

              {/** Add new card button */}
              <MainButton
                className="!w-full !max-w-[280px] !mt-4"
                onClick={() => openNewCardModal()}
              >
                Add New Card
              </MainButton>
            </>
          )}
        </section>

        {/** Google pay */}
        <section
          className="py-4 border-b-[1.5px] border-b-gray-200 lg:py-5"
          onClick={() => setPaymentMethod("googlePay")}
        >
          {/** Google pay radio */}
          <label className="flex items-center gap-x-3" htmlFor="googlePay">
            {/* Custom Radio */}
            <div className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-full ">
              {paymentMethod === "googlePay" && (
                <div className="shrink-0 h-2 w-2 bg-black rounded-full"></div>
              )}
            </div>

            <span className="text-[17px] md:text-[19px]">
              <span className="font-medium">Google Pay</span>
            </span>
          </label>
        </section>

        {/** Paypal */}
        <section
          className="py-4 border-b-[1.5px] border-b-gray-200 lg:py-5"
          onClick={() => setPaymentMethod("paypal")}
        >
          {/** Paypalradio */}
          <label className="flex items-center gap-x-3" htmlFor="paypal">
            {/* Custom Radio */}
            <div className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-full ">
              {paymentMethod === "paypal" && (
                <div className="shrink-0 h-2 w-2 bg-black rounded-full"></div>
              )}
            </div>

            <span className="text-[17px] md:text-[19px]">
              <span className="font-medium">Paypal</span>
            </span>
          </label>
        </section>

        {/** Cash on delivery */}
        <section
          className="py-4 border-b-[1.5px] border-b-gray-200 lg:py-5"
          onClick={() => setPaymentMethod("cash")}
        >
          {/** Paypalradio */}
          <label className="flex items-center gap-x-3" htmlFor="cash">
            {/* Custom Radio */}
            <div className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-full ">
              {paymentMethod === "cash" && (
                <div className="shrink-0 h-2 w-2 bg-black rounded-full"></div>
              )}
            </div>

            <span className="text-[17px] md:text-[19px]">
              <span className="font-medium">Cash on Delivery</span>
            </span>
          </label>
        </section>

        {/** Continue button */}
        {((paymentMethod !== "card" && paymentMethod) ||
          (paymentMethod === "card" && paymentCard)) && (
          <Link
            href={
              effectiveDiscountCode
                ? `/checkout/review?discountCode=${effectiveDiscountCode}`
                : "/checkout/review"
            }
            className="block mt-3 sticky bottom-2 px-0 pb-3 lg:static lg:bottom-0 lg:mt-5"
          >
            <button className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[18px] lg:max-w-[280px]">
              Continue
            </button>
          </Link>
        )}
      </main>
    </div>
  );
}
