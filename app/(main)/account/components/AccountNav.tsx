"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import { BsBoxSeam } from "react-icons/bs";

import { CiLocationOn } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

import { FaRegUser } from "react-icons/fa6";

import { PiCreditCard } from "react-icons/pi";

export default function AccountNav() {
  //Variables from Auth context
  const { user } = useAuth();

  //User credentials
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const userAvatar = user?.avatar;

  const pathname = usePathname();

  const isPersonalInfoActive = pathname === "/account/personal-info";
  const isOrdersActive = pathname === "/account/orders";
  const isAddressesActive = pathname === "/account/addresses";
  const isSavedCardsActive = pathname === "/account/cards";

  return (
    <div className="sticky top-[66px] w-full max-w-[600px] h-max bg-white shadow-2xl border-[1.5px] border-gray-100 rounded-lg z-20 px-3 py-1 shrink-0 lg:static lg:px-0 lg:py-0 lg:top-0 lg:w-[250px]">
      {/** User details */}
      <section className="hidden p-4 grid-cols-[45px_auto] gap-x-4 items-center border-b-[1.5px] border-b-gray-200 lg:grid">
        {/** User avatar */}
        {userAvatar ? (
          <Image
            src={userAvatar}
            height={45}
            width={45}
            className="w-[45px] h-[45px] shrink-0 object-cover border-[1.5px] border-grey rounded-full "
            alt={`${firstName} ${lastName}'s avatar`}
          />
        ) : (
          <FaUserCircle className="text-black text-[45px]" />
        )}

        {/** User names */}
        <div className="capitalize text-black">
          <p className="text-[16px] font-medium">Hello👋</p>
          <p className="text-[17px] font-semibold line-clamp-1 overflow-hidden text-ellipsis">
            {firstName} {lastName}
          </p>
        </div>
      </section>

      {/** Navigation */}
      <nav className="flex items-center justify-between lg:mt-5 lg:mb-10 lg:flex-col lg:gap-y-2">
        {/** Addresses */}
        <Link
          href="/account/personal-info"
          className={`w-max p-2 rounded-[5px] flex items-center justify-center lg:w-full lg:justify-start lg:p-4 lg:px-5 lg:rounded-none lg:gap-x-3 ${
            isPersonalInfoActive && "!bg-black"
          }`}
        >
          <FaRegUser
            className={`text-black text-lg ${
              isPersonalInfoActive && "text-white"
            }`}
          />

          <p
            className={`hidden text-base text-black lg:block ${
              isPersonalInfoActive && "!text-white"
            }`}
          >
            Personal Information
          </p>
        </Link>

        {/** Orders */}
        <Link
          href="/account/orders"
          className={`w-max p-2 rounded-[5px] flex items-center justify-center lg:w-full lg:justify-start lg:p-4 lg:px-5 lg:rounded-none lg:gap-x-3 ${
            isOrdersActive && "!bg-black"
          }`}
        >
          <BsBoxSeam
            className={`text-black text-lg ${isOrdersActive && "text-white"}`}
          />

          <p
            className={`hidden text-base text-black lg:block ${
              isOrdersActive && "!text-white"
            }`}
          >
            My Orders
          </p>
        </Link>

        {/** Addresses */}
        <Link
          href="/account/addresses"
          className={`w-max p-2 rounded-[5px] flex items-center justify-center lg:w-full lg:justify-start lg:p-4 lg:px-5 lg:rounded-none lg:gap-x-3 ${
            isAddressesActive && "!bg-black"
          }`}
        >
          <CiLocationOn
            className={`text-black text-lg ${
              isAddressesActive && "text-white"
            }`}
          />

          <p
            className={`hidden text-base text-black lg:block ${
              isAddressesActive && "!text-white"
            }`}
          >
            Manage Addresses
          </p>
        </Link>

        {/** Saved cards */}
        <Link
          href="/account/cards"
          className={`w-max p-2 rounded-[5px] flex items-center justify-center lg:w-full lg:justify-start lg:p-4 lg:px-5 lg:rounded-none lg:gap-x-3 ${
            isSavedCardsActive && "!bg-black"
          }`}
        >
          <PiCreditCard
            className={`text-black text-lg ${
              isSavedCardsActive && "text-white"
            }`}
          />

          <p
            className={`hidden text-base text-black lg:block ${
              isSavedCardsActive && "!text-white"
            }`}
          >
            Saved Cards
          </p>
        </Link>
      </nav>
    </div>
  );
}
