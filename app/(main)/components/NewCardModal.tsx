import { useState } from "react";

import { useAppDispatch } from "@/app/hooks/redux";

import { addCard } from "@/app/redux/cardsSlice";

import { Card } from "@/app/models/cards";

import { useNewCardModal } from "../contexts/NewCardModalContext";

import FormInput from "@/app/components/ui/FormInput";

import { CircularProgress } from "@mui/material";

import { CgClose } from "react-icons/cg";

import { FaCheck } from "react-icons/fa6";

export default function NewCardModal() {
  //New card modal variables
  const { closeNewCardModal, isAddingNewCard, setIsAddingNewCard } =
    useNewCardModal();

  //Card types
  const cardTypes = ["visa", "mastercard", "amex"];

  //Randomly pick a card type
  const type = cardTypes[Math.floor(Math.random() * cardTypes.length)];

  //Form inputs and error states
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [formattedNumber, setFormattedNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [defaultCard, setDefaultCard] = useState<boolean>(false);
  const [isFormError, setIsFormError] = useState<boolean>(false);

  //Regex patterns
  const expiryDateRegex = /^\d{2}\/\d{2}$/;

  //Check if user can add card
  const canUserAddCard =
    name &&
    number.length === 16 &&
    expiryDate.match(expiryDateRegex) &&
    cvv.length === 3;

  //New card object
  const newCard: Card = {
    id: Date.now().toString(),
    name,
    number,
    expiryDate,
    cvv,
    type,
    default: defaultCard,
  };

  //Dispatch function
  const dispatch = useAppDispatch();

  //Handle adding new card
  function handleAddCard() {
    //Set form error state true if there is a missing field
    //else, false
    if (!canUserAddCard) {
      setIsFormError(true);
      return;
    } else {
      setIsFormError(false);
    }

    //Set isAddingNewCard true
    setIsAddingNewCard(true);

    // Wait for 2 seconds
    setTimeout(() => {
      //Add card to redux state
      dispatch(addCard(newCard));

      //Close modal
      closeNewCardModal();

      //Set isAddingNewCard false
      setIsAddingNewCard(false);
    }, 2000);
  }

  return (
    <div className="fixed top-0 left-0 min-h-screen w-screen bg-[rgba(0,0,0,0.4)] z-[300] flex items-center justify-center p-3">
      {/* Modal Content */}
      <main className="w-full max-w-[500px] max-h-[calc(100vh_-_24px)] overflow-y-auto mx-auto bg-white rounded-xl p-4 text-black space-y-1 md:space-y-3 md:p-7">
        {/** Close icon */}
        <CgClose
          className="text-lg ml-auto md:text-xl"
          onClick={() => closeNewCardModal()}
        />

        {/** Header */}
        <h4 className="font-medium text-[17px] md:text-[19px]">
          Add a New Payment Card (dummy)
        </h4>

        {/** Form */}
        <form className="w-full space-y-1 lg:space-y-3">
          {/**** Name input */}
          <FormInput label="Cardholder's Name">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={name}
              placeholder="Enter card name"
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic and non-space characters
                setName(filteredValue);
              }}
              className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
                isFormError && !name && "!border-errorRed"
              }`}
            />
          </FormInput>

          {/**** Card number input */}
          <FormInput label="Card Number">
            <input
              type="text"
              name="number"
              id="number"
              autoComplete="off"
              maxLength={19}
              inputMode="numeric"
              value={formattedNumber}
              placeholder="●●●● ●●●● ●●●● ●●●●"
              onChange={(e) => {
                const input = e.target.value;

                //Number input
                const numberInput =
                  input.replace(/\s+/g, "").length > number.length
                    ? number + input
                    : number.slice(0, -1);

                //Remove non-digit characters
                const value = numberInput.replace(/\D/g, "");

                //Formatted value
                let formattedValue = "";

                for (let i = 0; i < value.length; i++) {
                  if (i > 0 && i % 4 === 0) {
                    formattedValue += " "; // Add space after every 4 digits
                  }
                  formattedValue += "●"; // Add dots instead of actual digits
                }

                //Set formatted value
                setFormattedNumber(formattedValue);

                // Update the actual number with the cleaned value (digits only)
                setNumber(value);
              }}
              className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
                isFormError && !(number.length === 16) && "!border-errorRed"
              }`}
            />
          </FormInput>

          {/** Expiry date and cvv */}
          <section className="flex items-center gap-x-3">
            {/**** Expiry date input */}
            <FormInput label="Expiry Date">
              <input
                type="text"
                name="expiryDate"
                id="expiryDate"
                autoComplete="off"
                maxLength={5}
                value={expiryDate}
                placeholder="MM/YY"
                onChange={(e) => {
                  const value = e.target.value;
                  const filteredValue = value.replace(/[^0-9/]/g, ""); // Allow only digits and "/"
                  setExpiryDate(filteredValue);
                }}
                className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
                  isFormError &&
                  !expiryDate.match(expiryDateRegex) &&
                  "!border-errorRed"
                }`}
              />
            </FormInput>

            {/**** Cvv input */}
            <FormInput label="CVV">
              <input
                type="text"
                name="cvv"
                id="cvv"
                autoComplete="off"
                inputMode="numeric"
                maxLength={3}
                value={cvv}
                placeholder="e.g. 123"
                onChange={(e) => {
                  const value = e.target.value;
                  const filteredValue = value.replace(/\D/g, ""); // Removes non-digit characters
                  setCvv(filteredValue);
                }}
                className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
                  isFormError && !(cvv.length === 3) && "!border-errorRed"
                }`}
              />
            </FormInput>
          </section>

          {/*** Default card checkbox */}
          <section className="flex items-center justify-between !mt-2">
            <label className="flex items-center gap-x-2" htmlFor="defaultCard">
              {/*** Hidden input */}
              <input
                type="checkbox"
                name="defaultCard"
                id="defaultCard"
                checked={defaultCard}
                onChange={(e) => setDefaultCard(e.target.checked)}
                className="hidden peer"
              />

              {/* Custom Checkbox */}
              <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black">
                <FaCheck className="text-white text-[0.6rem]" />
              </span>

              <span className="md:text-lg">
                <span>Use as my default payment card</span>
              </span>
            </label>
          </section>
        </form>

        {/** Buttons */}
        <section className="!mt-5 md:flex md:items-center md:gap-3">
          {/** Cancel */}
          <button
            className="hidden w-full h-max px-4 py-2 text-black border-[2px] border-gray-200 bg-gray-200 items-center justify-center rounded-[7px] z-10 md:w-1/2 md:h-[47px] md:text-lg md:flex"
            onClick={() => closeNewCardModal()}
          >
            Cancel
          </button>

          {/** Add address */}
          <button
            className={`w-full h-[43px] px-4 py-2 text-white bg-black  border-[2px] border-black flex items-center justify-center rounded-[7px] z-10 md:w-1/2 md:h-[47px] md:text-lg`}
            disabled={isAddingNewCard}
            onClick={handleAddCard}
          >
            {isAddingNewCard ? (
              <CircularProgress color="inherit" size={17} />
            ) : (
              "Add Card"
            )}
          </button>
        </section>
      </main>
    </div>
  );
}
