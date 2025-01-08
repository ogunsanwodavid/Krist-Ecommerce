"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { removeAddress } from "@/app/redux/addressesSlice";

import { useNewAddressModal } from "../../contexts/NewAddressModalContext";

import { useCheckout } from "../contexts/CheckoutContext";

import MainButton from "@/app/components/ui/MainButton";

import { FaCheck } from "react-icons/fa6";

import { FaRegTrashAlt } from "react-icons/fa";

import { FiPhoneCall } from "react-icons/fi";

import noAddressImg from "@/public/noAddress.svg";

export default function CheckoutAddress() {
  //New address modal variables
  const { openNewAddressModal } = useNewAddressModal();

  //Checkout context variables
  const { deliveryAddress, setDeliveryAddress } = useCheckout();

  //Addresses from the redux state
  const addresses = useAppSelector(
    (state: ReduxStoreState) => state.addresses.addresses
  );

  //State of the id of selected delivery address
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  //Set id on mount based on default address
  useEffect(() => {
    // Find the first address with default: true
    const defaultAddress = addresses.find((address) => address.default);

    // If a default address exists, set its id
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, [addresses]);

  // When selectedAddressId changes, update the selected delivery address
  useEffect(() => {
    const selectedAddress = addresses.find(
      (address) => address.id === selectedAddressId
    );

    if (selectedAddress) {
      setDeliveryAddress(selectedAddress);
    } else {
      setDeliveryAddress(null);
    }
  }, [selectedAddressId, addresses, setDeliveryAddress]);

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
          Select a delivery address
        </h3>

        {addresses.length > 0 && (
          <p className="text-[15px] md:text-[17px]">
            Is the address you&apos;d like to use displayed below? If so, click
            the corresponding &quot;Deliver Here&quot; button or you can enter a
            new delivery address.
          </p>
        )}
      </header>

      {/** Main list of addresses */}
      <main className="w-full py-4 border-b-[1.5px] border-b-gray-200">
        {addresses.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
            <Image
              src={noAddressImg}
              className="w-full max-w-[200px] md:max-w-[260px]"
              alt="Failed to load error image"
            />
            <p className="text-base text-center md:text-lg">
              You haven&apos;t added any address yet.
            </p>
          </div>
        ) : (
          <section className="space-y-5">
            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
              {addresses.map((address) => {
                //Function when clicked
                function handleClick() {
                  setSelectedAddressId(address.id);
                }

                //Function to delete address from redux state
                function handleDelete(e: React.MouseEvent) {
                  e.preventDefault();

                  dispatch(removeAddress(address.id));
                }

                return (
                  <section
                    className="p-5 bg-gray-100 rounded-[10px] space-y-2 cursor-pointer"
                    key={address.id}
                    onClick={handleClick}
                  >
                    {/** Address checkbox */}
                    <label
                      className="flex items-center justify-between"
                      htmlFor={address.id}
                    >
                      {/*** Hidden input */}
                      <input
                        type="checkbox"
                        name={address.id}
                        id={address.id}
                        checked={selectedAddressId === address.id}
                        className="hidden peer"
                      />

                      {/** Address name */}
                      <span className="text-[18px] md:text-[20px]">
                        <span className="font-semibold">{address.name}</span>
                      </span>

                      {/* Custom Checkbox */}
                      <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black">
                        <FaCheck className="text-white text-[0.6rem]" />
                      </span>
                    </label>

                    {/** Address details */}
                    <p className="text-[15px] md:text-[17px]">
                      {address.houseNumber}, {address.lga}, {address.state}.
                    </p>

                    {/** Mobile number */}
                    <p className="inline-flex items-center gap-x-2">
                      <FiPhoneCall className="text-black text-sm md:text-base" />
                      <span className="text-[15px] md:text-[17px]">
                        {address.mobileNumber}
                      </span>
                    </p>

                    {/** Delete button */}
                    <div
                      className="w-max ml-auto rounded-[5px] text-errorRed cursor-pointer lg:bg-[rgba(229,77,81,0.2)] lg:px-5 lg:py-1 lg:flex lg:items-center lg:gap-x-2"
                      onClick={handleDelete}
                    >
                      <FaRegTrashAlt className="text-[16px]" />
                      <p className="hidden md:text-[17px] lg:block">Delete</p>
                    </div>
                  </section>
                );
              })}
            </div>

            {/** Deliver here button */}
            {deliveryAddress && (
              <Link
                href={
                  effectiveDiscountCode
                    ? `/checkout/payment?discountCode=${effectiveDiscountCode}`
                    : "/checkout/payment"
                }
                className="block mt-3 sticky bottom-2 px-0 pb-3 lg:static lg:bottom-0 lg:mt-0 lg:pb-0"
              >
                <button className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[18px] lg:max-w-[280px]">
                  Deliver Here
                </button>
              </Link>
            )}
          </section>
        )}
      </main>

      {/** Add new address button */}
      <MainButton
        className="!w-full !max-w-[280px] !mt-4"
        onClick={() => openNewAddressModal()}
      >
        Add New Address
      </MainButton>
    </div>
  );
}
