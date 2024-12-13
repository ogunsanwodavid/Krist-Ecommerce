"use client";

import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import MainButton from "../ui/MainButton";

import { HiArrowRight } from "react-icons/hi2";

import heroImage from "@/public/hero-image-2.png";

export default function HeroSection() {
  //gsap.registerPlugin(useGSAP);

  const heroSectionContainer = useRef(null);

  useGSAP(
    () => {
      //This is the animation timeline for the texts in the hero section
      const textsTimeline = gsap.timeline({
        defaults: { duration: 0.7, ease: "power2.inOut" },
      });

      //Hero section Texts animation
      textsTimeline
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

      //Timeline for hero section image
      const imageTimeline = gsap.timeline({
        defaults: { duration: 0.7, ease: "power2.inOut" },
      });

      //Animation for hero image
      imageTimeline
        .to(".hero-image", {
          rotate: "10deg",
        })
        .to(".hero-image", {
          rotate: "-10deg",
          stagger: 0.3,
        })
        .to(".hero-image", {
          rotate: "0deg",
          stagger: 0.3,
        });

      //Timeline for bestseller text
      const bestSellerTimeline = gsap.timeline({
        defaults: { duration: 1.5, ease: "power2.inOut" },
      });

      //Animation for bestseller text
      bestSellerTimeline.from(".best-seller-text", {
        x: "100%",
      });
    },
    { scope: heroSectionContainer }
  );

  return (
    <div className="w-full  bg-gray-200 ">
      <div
        ref={heroSectionContainer}
        className="relative w-full max-w-[1200px] mx-auto overflow-hidden md:flex md:justify-around md:gap-y-10 md:px-8"
      >
        {/*** Hero texts */}
        <section className="relative  flex flex-col items-center justify-center gap-y-2 px-5 py-20 z-20 bg-[rgba(255,255,255,0.25)] md:bg-transparent md:w-max md:items-start md:gap-y-3 xlg:gap-y-4">
          <h3 className="hero-heading-1 text-2xl text-center opacity-100 duration-500 md:text-3xl xlg:text-4xl">
            Classic Exclusive
          </h3>
          <h2 className="hero-heading-2 text-3xl font-semibold text-center md:text-4xl xlg:text-5xl">
            Men&apos;s Collection
          </h2>
          <p className="hero-text-1 text-center text-lg md:text-xl xlg:text-2xl">
            UP TO 40% OFF
          </p>

          {/**** Shop now button */}
          <Link href="/shop">
            <MainButton className="hero-button gap-x-2">
              Shop Now <HiArrowRight className="text-white text-sm" />
            </MainButton>
          </Link>
        </section>

        {/*** Hero image */}
        <section className="absolute top-0 left-0 w-full z-10 flex justify-center md:relative md:shrink-0 md:h-[420px] md:w-[345px] xlg:h-[500px] xlg:w-[450px] overflow-hidden">
          <Image
            src={heroImage}
            className="hero-image min-h-full w-[80%] md:absolute md:top-0 md:left-0 md:w-full md:h-auto"
            alt="Handsome man in suit"
          />
        </section>

        {/**** Bestsellers tag */}
        <section className="hidden absolute left-[30%] bottom-0 w-full md:block lg:left-[40%]">
          <p className="best-seller-text font-bold text-[100px] leading-[100px] text-gray-100 uppercase lg:text-[130px] lg:leading-[130px]">
            BESTSELLERS
          </p>
        </section>
      </div>
    </div>
  );
}
