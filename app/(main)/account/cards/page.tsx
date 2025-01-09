"use client";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { removeCard } from "@/app/redux/cardsSlice";

import { useNewCardModal } from "../../contexts/NewCardModalContext";

import { formatCardNumber } from "@/app/utils/helpers";

import MainButton from "@/app/components/ui/MainButton";

import { FaRegTrashAlt } from "react-icons/fa";

import noCardImg from "@/public/noCard.svg";
import visaLogo from "@/public/visa-logo.svg";
import mastercardLogo from "@/public/mastercard-logo.svg";
import amexLogo from "@/public/amex-logo.svg";

export default function AccountSavedCards() {
  //New address modal variables
  const { openNewCardModal } = useNewCardModal();

  //Saved cards from the redux state
  const savedCards = useAppSelector(
    (state: ReduxStoreState) => state.cards.cards
  );

  //Dispatch function
  const dispatch = useAppDispatch();

  //Handle delete card
  function handleDeleteCard(id: string) {
    dispatch(removeCard(id));
  }

  return (
    <div className="space-y-4">
      {/** Header */}
      <header>
        <h3 className="text-black text-[20px] lg:hidden">Saved Cards</h3>
      </header>

      {/** Add new address button */}
      <MainButton
        className="!w-full !max-w-[280px]"
        onClick={() => openNewCardModal()}
      >
        <span className="mr-2">+</span>Add New Card
      </MainButton>

      {/** Main list of adddresses */}
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
        <main>
          {savedCards.map((card) => {
            const cardType = card.type;

            return (
              <section
                className="grid grid-cols-[auto_16px] items-center gap-x-2 py-4 border-b-[1.5px] border-b-gray-200 lg:flex lg:items-center lg:justify-between"
                key={card.id}
              >
                {/** Card details */}
                <main className="flex items-center gap-x-3">
                  {/** Card type image */}
                  <div className="bg-gray-100 flex items-center justify-center px-3 py-4 rounded-[6px]">
                    <Image
                      src={
                        cardType === "visa"
                          ? visaLogo
                          : cardType === "mastercard"
                          ? mastercardLogo
                          : amexLogo
                      }
                      className="w-[35px] lg:w-[42px]"
                      alt={`${cardType}'s logo`}
                      width={40}
                      height={20}
                    />
                  </div>

                  <div className="space-y-1 lg:w-max lg:space-y-[6px]">
                    <p className="font-semibold text-[17px] capitalize md:text-[19px]">
                      {cardType}
                    </p>
                    <p className="text-[16px] md:text-[18px]">
                      {formatCardNumber(card.number)}
                    </p>
                  </div>
                </main>

                {/** Delete button */}
                <div
                  className="w-max  rounded-[5px] text-errorRed cursor-pointer lg:ml-auto lg:bg-[rgba(229,77,81,0.2)] lg:px-3 lg:py-2 lg:flex lg:items-center lg:gap-x-2"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <FaRegTrashAlt className="text-[16px]" />
                  <p className="hidden md:text-lg lg:block">Delete</p>
                </div>
              </section>
            );
          })}
        </main>
      )}
    </div>
  );
}
