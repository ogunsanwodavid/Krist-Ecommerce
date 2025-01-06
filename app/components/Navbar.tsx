import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { ReduxStoreState } from "../redux/store";

import { useAppSelector } from "../hooks/redux";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

import MobileNav from "./MobileNav";
import MiniCart from "./MiniCart";
import MiniWishlist from "./MiniWishlist";

import MainButton from "./ui/MainButton";

import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { PiHeart, PiShoppingCartSimple } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";

import darkLogo from "@/public/dark-logo.svg";

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

  //Check if icons are hovered
  const [isCartIconHovered, setIsCartIconHovered] = useState<boolean>(false);
  const [isWishlistIconHovered, setIsWishlistIconHovered] =
    useState<boolean>(false);

  //State of minicart
  const [isMiniCartOpen, setIsMiniCartOpen] = useState<boolean>(false);
  const [isMiniWishlistOpen, setIsMiniWishlistOpen] = useState<boolean>(false);

  //Open minicart on cart icon hover
  useEffect(() => {
    if (isCartIconHovered) {
      setIsMiniCartOpen(true);
    } else {
      setIsMiniCartOpen(false);
    }
  }, [isCartIconHovered]);

  //Open miniwishlist on cart icon hover
  useEffect(() => {
    if (isWishlistIconHovered) {
      setIsMiniWishlistOpen(true);
    } else {
      setIsMiniWishlistOpen(false);
    }
  }, [isWishlistIconHovered]);

  //Cart Items from redux state
  const cartItems = useAppSelector((state: ReduxStoreState) => state.cart.cart);

  //Number of items in the cart
  const cartItemsCount = cartItems.length;

  //Wishlist items from redux state
  const wishlistItems = useAppSelector(
    (state: ReduxStoreState) => state.wishlist.items
  );

  //Number of items in the wishlist
  const wishlistItemsCount = wishlistItems.length;

  //Variables from Auth context
  const { user, isAuthenticated } = useAuth();

  //User credentials
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const userAvatar = user?.avatar;

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
          {/** Wishlist section */}
          <div
            className="relative w-max cursor-pointer"
            onMouseEnter={() => setIsWishlistIconHovered(true)}
            onMouseLeave={() => setIsWishlistIconHovered(false)}
          >
            {/**** Wishlist icon */}
            <Link href="/wishlist" className="block">
              <PiHeart className="text-black text-2xl" />
            </Link>

            {/** Wishlist count badge */}
            {wishlistItemsCount > 0 && (
              <span className="absolute right-0 top-0 bg-black rounded-full w-[14px] h-[14px] text-[9px] text-white flex items-center justify-center">
                {wishlistItemsCount}
              </span>
            )}

            {/** Mini wishlist */}
            {isMiniWishlistOpen && wishlistItemsCount > 0 && (
              <MiniWishlist setIsMiniWishlistOpen={setIsMiniWishlistOpen} />
            )}
          </div>

          {/*** Cart section*/}
          <div
            className="relative w-max cursor-pointer"
            onMouseEnter={() => setIsCartIconHovered(true)}
            onMouseLeave={() => setIsCartIconHovered(false)}
          >
            {/** Cart icon */}
            <Link href="/cart" className="block">
              <PiShoppingCartSimple className="text-black text-2xl" />
            </Link>

            {/** Cart count badge */}
            {cartItemsCount > 0 && (
              <span className="absolute right-0 top-0 bg-black rounded-full w-[14px] h-[14px] text-[9px] text-white flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}

            {/** Mini cart */}
            {isMiniCartOpen && cartItemsCount > 0 && (
              <MiniCart setIsMiniCartOpen={setIsMiniCartOpen} />
            )}
          </div>

          {/** User name if authenticated */}
          {isAuthenticated && <p className="text-lg">Hi, {firstName}</p>}

          {/*** User avatar */}
          {userAvatar ? (
            <Image
              src={userAvatar}
              className="h-[40px] w-[40px] object-cover rounded-full border-[1.5px] border-grey"
              width={40}
              height={40}
              alt={`${firstName} ${lastName}'s avatar`}
            />
          ) : (
            <Link href="/account" className="block">
              <FaUserCircle className="text-black text-[40px]" />
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <MainButton>Login</MainButton>
              </Link>

              <Link href="/signup">
                <MainButton className="bg-white border-[1.5px] border-black !text-black">
                  Signup
                </MainButton>
              </Link>
            </>
          ) : (
            <Link href="/account">
              <MainButton>My Account</MainButton>
            </Link>
          )}
        </section>

        {/**** Mobile Nav */}
        <MobileNav isOpen={isMobileNavOpen} />
      </main>
    </div>
  );
}
