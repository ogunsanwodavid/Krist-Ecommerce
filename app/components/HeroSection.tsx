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
      const timeline = gsap.timeline({ defaults: { duration: 0.7 } });

      // gsap code here...
      timeline
        .from(".hero-heading-1", {
          opacity: 0,
          y: "100%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: heroSectionContainer.current,
            start: "top bottom", // Start when the top of the text hits the bottom of the viewport
            end: "top center", // End when the top of the text hits the center of the viewport
            scrub: true, // Smooth scrubbing, takes effect when scrolling
          },
        })
        .from(".hero-heading-2", {
          opacity: 0,
          y: "100%",
          ease: "power2.inOut",
          stagger: 0.3,
          scrollTrigger: {
            trigger: heroSectionContainer.current,
            start: "top bottom", // Start when the top of the text hits the bottom of the viewport
            end: "top center", // End when the top of the text hits the center of the viewport
            scrub: true, // Smooth scrubbing, takes effect when scrolling
          },
        })
        .from(".hero-text-1", {
          opacity: 0,
          y: "100%",
          ease: "power2.inOut",
          stagger: 0.3,
          scrollTrigger: {
            trigger: heroSectionContainer.current,
            start: "top bottom", // Start when the top of the text hits the bottom of the viewport
            end: "top center", // End when the top of the text hits the center of the viewport
            scrub: true, // Smooth scrubbing, takes effect when scrolling
          },
        })
        .from(".hero-button", {
          opacity: 0,
          y: "100%",
          ease: "power2.inOut",
          stagger: 0.3,
          scrollTrigger: {
            trigger: heroSectionContainer.current,
            start: "top bottom", // Start when the top of the text hits the bottom of the viewport
            end: "top center", // End when the top of the text hits the center of the viewport
            scrub: true, // Smooth scrubbing, takes effect when scrolling
          },
        }); // <-- automatically reverted
    },
    { scope: heroSectionContainer }
  ); // <-- scope is for selector text (optional)

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
