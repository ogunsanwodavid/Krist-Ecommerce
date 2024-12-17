import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import MobileNav from "./MobileNav";

import MainButton from "./ui/MainButton";

import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { PiHeart, PiShoppingCartSimple } from "react-icons/pi";

import darkLogo from "@/public/dark-logo.svg";
import defaultProfilePic from "@/public/dave.jpeg";

export default function Navbar() {
  // Get the current pathname
  const pathname = usePathname();

  //State of the mobile navbar
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Effect to handle route changes
  useEffect(() => {
    // Close mobile nav on route change
    setIsMobileNavOpen(false);
  }, [pathname]); // Dependency array includes pathname

  //Function to open or close mobile navbar
  function handleMenuBtnClick() {
    setIsMobileNavOpen((prev) => !prev);
  }

  return (
    <div className="w-full z-50 bg-white sticky top-0 shadow-md">
      <main className="w-full max-w-[1200px] mx-auto px-3 py-4 flex items-center justify-between z-10 md:px-8 lg:px-0">
        {/**** Dark Logo */}
        <Link href="/">
          <Image
            src={darkLogo}
            className="h-7 w-auto md:h-8"
            alt="dark Krist logo"
          />
        </Link>

        {/**** Desktop nav */}
        <nav className="hidden items-center justify-center gap-x-10 md:text-lg lg:flex">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/our-story">Our Story</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact-us">Contact Us</Link>
        </nav>

        {/**** Icons */}
        <section className="w-max flex items-center gap-x-3">
          {/*** Menu button */}
          <div
            className="w-max flex items-center justify-center p-[2px] rounded-[4px] bg-gray-50 border-[1px] border-gray-800 lg:hidden"
            onClick={handleMenuBtnClick}
          >
            {!isMobileNavOpen ? (
              <HiOutlineMenuAlt3 className="text-black text-2xl md:text-3xl" />
            ) : (
              <HiX className="text-black text-2xl md:text-3xl" />
            )}
          </div>
        </section>

        {/***** Right aligned contents on desktop */}
        <section className="hidden items-center gap-x-5 lg:flex">
          {/**** Wishlist icon */}
          <PiHeart className="text-black text-2xl" />

          {/*** Cart icon */}
          <PiShoppingCartSimple className="text-black text-2xl" />

          {/*** User avatar */}
          <Image
            src={defaultProfilePic}
            className="h-[40px] w-[40px] object-cover rounded-full border-[1.5px] border-grey"
            alt="Default profile picture"
          />

          {/*** Login button */}
          <Link href="/login">
            <MainButton>Login</MainButton>
          </Link>

          {/*** Login button */}
          <Link href="/signup">
            <MainButton className="bg-white border-[1.5px] border-black !text-black">
              Signup
            </MainButton>
          </Link>
        </section>

        {/**** Mobile Nav */}
        <MobileNav isOpen={isMobileNavOpen} />
      </main>
    </div>
  );
}
