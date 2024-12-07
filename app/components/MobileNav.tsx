import Image from "next/image";

import defaultAvatar from "@/public/dave.jpeg";
import Link from "next/link";
import {
  HiChatBubbleOvalLeftEllipsis,
  HiDocumentText,
  HiMiniHome,
  HiMiniShoppingBag,
  HiUserGroup,
  HiUser,
} from "react-icons/hi2";

import { PiShoppingCartSimpleFill } from "react-icons/pi";

import MainButton from "./ui/MainButton";

interface MobileNavProps {
  isOpen: boolean;
}

export default function MobileNav({ isOpen }: MobileNavProps) {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } transition-all duration-150 ease-in-out absolute bg-white top-full right-3 w-[calc(100vw_-_24px)] max-w-[250px] rounded-[15px] overflow-hidden z-50 lg:hidden`}
      style={{
        boxShadow:
          "3px 3px 10px rgba(0, 0, 0, 0.2), -3px 3px 10px rgba(0, 0, 0, 0.2), 0px 10px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/** User profile info */}
      <section className="max-w-full flex items-center p-6 gap-x-5">
        {/*** User avatar */}
        <Image
          src={defaultAvatar}
          className="w-[43px] h-[43px] shrink-0 object-cover border-[1.5px] border-grey rounded-[4px] "
          alt="User avatar"
        />

        {/*** User name */}
        <div className="flex-shrink flex-1 h-max my-auto space-y-1 font-semibold">
          <h3 className="text-lg leading-[1.3rem]">David</h3>
          <h4 className="text-base whitespace-nowrap text-ellipsis overflow-hidden leading-[1rem]">
            Ogunsanwo
          </h4>
        </div>
      </section>

      {/*** Navigation */}
      <nav className="w-full space-y-6 bg-gray-50 p-4 font-semibold">
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

        {/*** Profile */}
        <Link href="/profile" className="flex items-center gap-x-4">
          <HiUser className="text-black text-xl" />

          <p>My Profile</p>
        </Link>

        {/*** Buttons */}
        <section className="space-y-2">
          {/*** Login button */}
          <Link href="/login" className="flex items-center">
            <MainButton className="w-full">Login</MainButton>
          </Link>

          {/*** Signup button */}
          <Link href="/signup" className="flex items-center">
            <MainButton className="w-full bg-white border-[1.5px] border-black !text-black">
              Signup
            </MainButton>
          </Link>
        </section>
      </nav>
    </div>
  );
}
