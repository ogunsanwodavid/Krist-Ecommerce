"use client";

import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import MainButton from "./ui/MainButton";

import { HiArrowRight } from "react-icons/hi2";

import heroImage from "@/public/hero-image-2.png";

export default function HeroSection() {
  //gsap.registerPlugin(useGSAP);

  const heroSectionContainer = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: { duration: 0.7, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: heroSectionContainer.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      // Adding animations to the timeline
      timeline
        .from(".hero-heading-1", {
          opacity: 0,
          y: "100%",
        })
        .from(".hero-heading-2", {
          opacity: 0,
          y: "100%",
          stagger: 0.3,
        })
        .from(".hero-text-1", {
          opacity: 0,
          y: "100%",
          stagger: 0.3,
        })
        .from(".hero-button", {
          opacity: 0,
          y: "100%",
          stagger: 0.3,
        });
    },
    { scope: heroSectionContainer }
  );

  return (
    <div
      ref={heroSectionContainer}
      className="relative w-full bg-gray-200 overflow-hidden"
    >
      {/*** Hero texts */}
      <section className="relative  flex flex-col items-center justify-center gap-y-2 px-5 py-20 z-20 bg-[rgba(255,255,255,0.25)]">
        <h3 className="hero-heading-1 text-2xl text-center opacity-100 duration-500">
          Classic Exclusive
        </h3>
        <h2 className="hero-heading-2 text-3xl font-semibold text-center">
          Men&apos;s Collection
        </h2>
        <p className="hero-text-1 text-center text-lg">UP TO 40% OFF</p>

        {/**** Shop now button */}
        <Link href="/shop">
          <MainButton className="hero-button gap-x-2">
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
