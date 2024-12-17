import Image from "next/image";
import Link from "next/link";

import EmailSubscription from "./EmailSubscription";

import lightLogo from "@/public/light-logo.svg";

import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { CiLocationOn, CiMail } from "react-icons/ci";

import visaLogo from "@/public/visa-logo.svg";
import mastercardLogo from "@/public/mastercard-logo.svg";
import googlePayLogo from "@/public/googlepay-logo.svg";
import amexLogo from "@/public/amex-logo.svg";
import paypalLogo from "@/public/paypal-logo.svg";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  //Array of the images of accepted payment cards
  const acceptedPaymentCardsImages = [
    { path: visaLogo, alt: "VISA logo" },
    { path: mastercardLogo, alt: "MasterCard Logo" },
    { path: googlePayLogo, alt: "Google Pay Logo" },
    { path: amexLogo, alt: "Amex Logo" },
    { path: paypalLogo, alt: "Paypal Logo" },
  ];

  return (
    <footer className="w-full bg-black mt-auto">
      <main className="relative w-full max-w-[1200px] mx-auto px-3 pt-5 py-12 text-white md:pt-12 md:text-lg md:px-8 lg:px-0">
        {/**** Top section */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-7 lg:grid-cols-[auto_200px_200px_auto] lg:gap-10">
          {/**** Logo and Contact info */}
          <section className="w-full flex flex-col items-center gap-y-2 sm:items-start">
            {/**** Light Logo */}
            <Link href="/">
              <Image
                src={lightLogo}
                className="h-7 w-auto md:h-8"
                alt="dark Krist logo"
              />
            </Link>

            {/**** Phone call */}
            <a
              href="tel:+2348159867285"
              className="space-x-2 text-center sm:text-left"
            >
              <LiaPhoneVolumeSolid className="text-white text-lg inline-block" />
              <span>+234 815 986 7285</span>
            </a>

            {/*** Email */}
            <a
              href="mailto:ogunsannwodavid123@gmail.com"
              className="space-x-2 text-center sm:text-left"
            >
              <CiMail className="text-white text-lg inline-block" />
              <span>contact@krist.com</span>
            </a>

            {/*** Address */}
            <div className="space-x-2 text-center sm:text-left">
              <CiLocationOn className="text-white text-lg inline-block" />
              <span>3891 Ranchview Dr. Richardson, California 62639</span>
            </div>
          </section>

          {/*** User information nav */}
          <nav className="w-full flex flex-col items-center gap-y-2 sm:items-start">
            <h4 className="font-semibold text-lg md:text-xl">Information</h4>

            <Link href="/profile">My Profile</Link>

            <Link href="/login">Login</Link>

            <Link href="/cart">My Cart</Link>

            <Link href="/profile/wishlist">My Wishlist</Link>

            <Link href="/checkout">Checkout</Link>
          </nav>

          {/*** Services nav */}
          <nav className="w-full flex flex-col items-center gap-y-2 sm:items-start">
            <h4 className="font-semibold text-lg md:text-xl">Services</h4>

            <Link href="#">About Us</Link>

            <Link href="#">Careers</Link>

            <Link href="#">Delivery Information</Link>

            <Link href="#">Privacy Policy</Link>

            <Link href="#">Terms & Conditions</Link>
          </nav>

          {/**** Email subscription */}
          <EmailSubscription />
        </div>

        {/*** Bottom section */}
        <div
          className=" pt-5 mt-8 border-t-[1px] border-grey grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_max-content] lg:gap-10
        "
        >
          {/** Accepted cards */}
          <section className="flex items-center justify-center flex-wrap gap-3 md:justify-start">
            {acceptedPaymentCardsImages.map(
              (card: { path: string; alt: string }, index) => {
                return (
                  <div
                    className="w-[70px] bg-white rounded-[6px] py-2 flex items-center justify-center"
                    key={index}
                  >
                    <Image
                      src={card.path}
                      className="h-4 w-auto"
                      alt={card.alt}
                    />
                  </div>
                );
              }
            )}
          </section>

          {/*** Copyright text */}
          <p className="text-center md:text-left">
            ©{new Date().getFullYear()} Krist All Rights are reserved.
          </p>

          {/*** Social Logos */}
          <section className="flex items-center justify-center gap-x-5 md:justify-start">
            {/*** Twitter X icon */}
            <Link href="https://x.com/00xdave">
              <FaXTwitter className="text-white text-2xl" />
            </Link>

            {/** Github icon */}
            <Link href="https://github.com/ogunsanwodavid">
              <FaGithub className="text-white text-2xl" />
            </Link>

            {/** Linkedin icon */}
            <Link href="https://www.linkedin.com/in/ogunsanwo-david-399817238">
              <FaLinkedin className="text-white text-2xl" />
            </Link>
          </section>
        </div>
      </main>
    </footer>
  );
}
