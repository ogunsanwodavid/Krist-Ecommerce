"use client";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { useNewAddressModal } from "../../contexts/NewAddressModalContext";

import { removeAddress } from "@/app/redux/addressesSlice";

import MainButton from "@/app/components/ui/MainButton";

import { FiPhoneCall } from "react-icons/fi";

import { FaRegTrashAlt } from "react-icons/fa";

import noAddressImg from "@/public/noAddress.svg";

export default function AccountAddresses() {
  //New address modal variables
  const { openNewAddressModal } = useNewAddressModal();

  //Addresses from the redux state
  const addresses = useAppSelector(
    (state: ReduxStoreState) => state.addresses.addresses
  );

  //Dispatch function
  const dispatch = useAppDispatch();

  //Handle delete address
  function handleDeleteAddress(id: string) {
    dispatch(removeAddress(id));
  }

  return (
    <div className="space-y-4">
      {/** Header */}
      <header>
        <h3 className="text-black text-[20px] lg:hidden">Manage Addresses</h3>
      </header>

      {/** Add new address button */}
      <MainButton
        className="!w-full !max-w-[280px]"
        onClick={() => openNewAddressModal()}
      >
        <span className="mr-2">+</span>Add New Address
      </MainButton>

      {/** Main list of adddresses */}
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
        <main>
          {addresses.map((address) => (
            <section
              className="grid grid-cols-[auto_16px] items-center gap-x-2  py-2 border-b-[1.5px] border-b-gray-200 lg:flex lg:items-center lg:justify-between"
              key={address.id}
            >
              {/** Address details */}
              <div className="space-y-1 lg:w-max lg:space-y-[6px]">
                <p className="font-semibold text-[17px] md:text-[19px]">
                  {address.name}
                </p>
                <p className="text-[16px] md:text-[18px]">
                  {address.houseNumber}, {address.lga}, {address.state} state.
                </p>
                <p className="inline-flex items-center gap-x-2">
                  <FiPhoneCall className="text-black text-sm md:text-base" />
                  <span className="text-[15px] md:text-[17px]">
                    {address.mobileNumber}
                  </span>
                </p>
              </div>

              {/** Delete button */}
              <div
                className="w-max  rounded-[5px] text-errorRed cursor-pointer lg:ml-auto lg:bg-[rgba(229,77,81,0.2)] lg:px-3 lg:py-2 lg:flex lg:items-center lg:gap-x-2"
                onClick={() => handleDeleteAddress(address.id)}
              >
                <FaRegTrashAlt className="text-[16px]" />
                <p className="hidden md:text-lg lg:block">Delete</p>
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}
