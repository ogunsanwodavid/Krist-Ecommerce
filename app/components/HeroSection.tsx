import Image from "next/image";
import Link from "next/link";

import MainButton from "./ui/MainButton";

import { HiArrowRight } from "react-icons/hi2";

import heroImage from "@/public/hero-image-2.png";

export default function HeroSection() {
  return (
    <div className="relative w-full bg-gray-200 overflow-hidden">
      {/*** Hero texts */}
      <section className="relative  flex flex-col items-center justify-center gap-y-2 px-5 py-20 z-20 bg-[rgba(255,255,255,0.25)]">
        <h3 className="text-2xl text-center">Classic Exclusive</h3>
        <h2 className="text-3xl font-semibold text-center">
          Men&apos;s Collection
        </h2>
        <p className="text-center text-lg">UP TO 40% OFF</p>

        {/**** Shop now button */}
        <Link href="/shop">
          <MainButton className="gap-x-2">
            Shop Now <HiArrowRight className="text-white text-sm" />
          </MainButton>
        </Link>
      </section>

      {/*** Hero image */}
      <section className="absolute top-0 left-0 w-full z-10 flex justify-center">
        <Image
          src={heroImage}
          className="min-h-full w-[80%]"
          alt="Handsome man in suit"
        ></Image>
      </section>
    </div>
  );
}
