import Image from "next/image";

import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

import MainButton from "./ui/MainButton";

import {
  HiChatBubbleOvalLeftEllipsis,
  HiDocumentText,
  HiMiniHome,
  HiMiniShoppingBag,
  HiUserGroup,
} from "react-icons/hi2";

import { PiHeartFill, PiShoppingCartSimpleFill } from "react-icons/pi";

import { FaUserCircle } from "react-icons/fa";

interface MobileNavProps {
  isOpen: boolean;
}

export default function MobileNav({ isOpen }: MobileNavProps) {
  //Variables from Auth context
  const { user, isAuthenticated } = useAuth();

  //User credentials
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const userAvatar = user?.avatar;

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } transition-all duration-150 ease-in-out absolute bg-white top-full right-3 w-[calc(100vw_-_24px)] max-w-[250px] max-h-[calc(100vh_-_100%)] rounded-[15px] overflow-x-hidden overflow-y-auto z-50  lg:hidden`}
      style={{
        boxShadow:
          "3px 3px 10px rgba(0, 0, 0, 0.2), -3px 3px 10px rgba(0, 0, 0, 0.2), 0px 10px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/** User profile info */}
      {isAuthenticated && (
        <section className="grid grid-cols-[43px_auto] items-center p-4 gap-x-3">
          {/*** User avatar */}
          {userAvatar ? (
            <Image
              src={userAvatar}
              className="w-[43px] h-[43px] shrink-0 object-cover border-[1.5px] border-grey rounded-full "
              alt="User avatar"
            />
          ) : (
            <Link href="/account" className="block">
              <FaUserCircle className="text-black text-[40px]" />
            </Link>
          )}

          {/*** User name */}
          <div className="h-max my-auto space-y-1 font-medium">
            <h3 className="text-lg leading-[1.3rem]">{firstName}</h3>
            <h4 className="w-full text-base line-clamp-1 text-ellipsis overflow-hidden leading-[1rem]">
              {lastName}
            </h4>
          </div>
        </section>
      )}

      {/*** Navigation */}
      <nav className="w-full space-y-7 bg-gray-50 p-4 font-medium">
        {/*** Home */}
        <Link href="/" className="flex items-center gap-x-4">
          <HiMiniHome className="text-black text-xl" />

          <p>Home</p>
        </Link>

        {/*** Shop */}
        <Link href="/shop" className="flex items-center gap-x-4">
          <HiMiniShoppingBag className="text-black text-xl" />

          <p>Shop</p>
        </Link>

        {/*** Cart */}
        <Link href="/cart" className="flex items-center gap-x-4">
          <PiShoppingCartSimpleFill className="text-black text-xl" />

          <p>Cart</p>
        </Link>

        {/*** Wishlist */}
        <Link href="/wishlist" className="flex items-center gap-x-4">
          <PiHeartFill className="text-black text-xl" />

          <p>Wishlist</p>
        </Link>

        {/*** Our Story */}
        <Link href="/our-story" className="flex items-center gap-x-4">
          <HiUserGroup className="text-black text-xl" />

          <p>Our Story</p>
        </Link>

        {/*** Blog*/}
        <Link href="/blog" className="flex items-center gap-x-4">
          <HiDocumentText className="text-black text-xl" />

          <p>Blog</p>
        </Link>

        {/*** Contact Us */}
        <Link href="/contact-us" className="flex items-center gap-x-4">
          <HiChatBubbleOvalLeftEllipsis className="text-black text-xl" />

          <p>Contact Us</p>
        </Link>

        {/**
         *Buttons
         *Show login and signup button when user not authenticated
         *else show my account button
         */}
        <section className="space-y-2">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="flex items-center">
                <MainButton className="w-full">Login</MainButton>
              </Link>
              <Link href="/signup" className="flex items-center">
                <MainButton className="w-full bg-white border-[1.5px] border-black !text-black">
                  Signup
                </MainButton>
              </Link>{" "}
            </>
          ) : (
            <Link href="/account" className="flex items-center">
              <MainButton className="w-full">My Account</MainButton>
            </Link>
          )}
        </section>
      </nav>
    </div>
  );
}
