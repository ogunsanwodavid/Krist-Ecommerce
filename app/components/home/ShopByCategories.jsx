"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";

import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import menCategoryImg from "@/public/men-category.png";
import womenCategoryImg from "@/public/women-category.png";
import kidsCategoryImg from "@/public/kids-category.png";
import bagsCategoryImg from "@/public/bags-category.png";
import watchesCategoryImg from "@/public/watches-category.png";
import headwearCategoryImg from "@/public/headwear-category.png";
import shoesCategoryImg from "@/public/shoes-category.png";
import Link from "next/link";

export default function ShopByCategories() {
  //Shopping Categories
  const shoppingCategories = useMemo(
    () => [
      {
        category: "Men's wear",
        image: menCategoryImg,
        alt: "Men's wear image",
        code: "men",
      },
      {
        category: "Women's wear",
        image: womenCategoryImg,
        alt: "Women's wear image",
        code: "women",
      },
      {
        category: "Kids' wear",
        image: kidsCategoryImg,
        alt: "Kids' wear image",
        code: "kids",
      },
      {
        category: "Bags",
        image: bagsCategoryImg,
        alt: "Bag image",
        code: "bags",
      },
      {
        category: "Watches",
        image: watchesCategoryImg,
        alt: "Watch image",
        code: "watches",
      },
      {
        category: "Headwear",
        image: headwearCategoryImg,
        alt: "Headwear image",
        code: "headwear",
      },
      {
        category: "Shoes",
        image: shoesCategoryImg,
        alt: "Shoe image",
        code: "shoes",
      },
    ],
    []
  ); // Empty dependency array ensures this runs only once

  //Ref for each category box
  const categoryBoxesRefs = useRef([]);

  // Initialize refs on render
  if (categoryBoxesRefs.current.length !== shoppingCategories.length) {
    categoryBoxesRefs.current = shoppingCategories.map(
      (_, i) => categoryBoxesRefs.current[i] || React.createRef()
    );
  }

  // GSAP animation for each box
  useEffect(() => {
    const animations = categoryBoxesRefs.current
      .map((ref) => {
        if (!ref.current) return null;

        const tagAnim = gsap.from(ref.current.querySelector(".tag"), {
          x: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top center",
            end: "top center",
            //scrub: true,
          },
        });

        const buttonAnim = gsap.from(ref.current.querySelector(".button"), {
          opacity: 0,
          y: "100%",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "bottom bottom",
            end: "bottom bottom",
            //scrub: true,
          },
        });

        return [tagAnim, buttonAnim];
      })
      .filter(Boolean);

    return () => {
      // Cleanup ScrollTrigger and animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      animations.forEach((animArray) =>
        animArray?.forEach((anim) => anim?.kill())
      );
    };
  }, [shoppingCategories, categoryBoxesRefs]);

  //Refs for the swiper navigators
  const prevSwiperBtn = useRef(null);
  const nextSwiperBtn = useRef(null);

  //State to know if first and last slides are active
  const [isFirstSlideActive, setIsFirstSlideActive] = useState(true);
  const [isLastSlideActive, setIsLastSlideActive] = useState(false);

  // Function to handle slide change
  const handleSlideChange = (swiper) => {
    setIsFirstSlideActive(swiper.isBeginning);
    setIsLastSlideActive(swiper.isEnd);
  };

  function handleSlideReachBeginning() {
    setIsFirstSlideActive(true);
  }

  function handleSlideReachEnd() {
    setIsLastSlideActive(true);
  }

  return (
    <div className="w-full">
      {/**** Inner container */}
      <div className="w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-8 md:pt-20 md:pb-10 md:space-y-7 lg:px-0">
        {/*** Header */}
        <header className="w-full flex gap-x-4 items-center justify-between">
          <h2 className="text-black text-[23px] md:text-3xl">
            Shop by Categories
          </h2>

          {/*** Swiper navigtion */}
          <section className="flex gap-x-2 md:gap-x-4">
            {/**** Previous navigator */}
            <div
              className={`w-[35px] h-[35px] bg-black rounded-[6px] flex items-center justify-center md:h-[40px] md:w-[40px] ${
                isFirstSlideActive && "!bg-gray-100"
              }`}
              aria-disabled={isFirstSlideActive}
              ref={prevSwiperBtn}
            >
              <HiArrowLeft
                className={`text-white text-sm md:text-base ${
                  isFirstSlideActive && "!text-black"
                }`}
              />
            </div>

            {/**** Next navigator */}
            <div
              className={`w-[35px] h-[35px] bg-black rounded-[6px] flex items-center justify-center md:h-[40px] md:w-[40px]  ${
                isLastSlideActive && "!bg-gray-100"
              }`}
              aria-disabled={isLastSlideActive}
              ref={nextSwiperBtn}
            >
              <HiArrowRight
                className={`text-white text-sm md:text-base ${
                  isLastSlideActive && "!text-black"
                }`}
              />
            </div>
          </section>
        </header>

        {/*** Main list of categories */}

        <main className="w-full">
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            modules={[Navigation, Scrollbar]}
            scrollbar={{ draggable: true }}
            onSlideChange={handleSlideChange}
            onReachBeginning={handleSlideReachBeginning}
            onReachEnd={handleSlideReachEnd}
            onInit={(swiper) => {
              // Assign refs to navigation buttons after swiper initialization
              swiper.params.navigation.prevEl = prevSwiperBtn.current;
              swiper.params.navigation.nextEl = nextSwiperBtn.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="flex"
          >
            {shoppingCategories.map((category, index) => {
              return (
                <SwiperSlide className="w-full max-w-[277.5px]" key={index}>
                  <Link
                    href={`/shop/?categories=${category.code.toLowerCase()}`}
                    className="relative w-full h-[350px] bg-gray-200  p-3 flex flex-col overflow-hidden"
                    ref={categoryBoxesRefs.current[index]}
                  >
                    {/** Category tag */}
                    <div className="tag absolute left-[30%] top-[12px] w-full font-bold text-[40px] leading-[40px] text-gray-300 whitespace-nowrap ">
                      {category.category}
                    </div>

                    {/**** Category image */}
                    <Image
                      src={category.image}
                      className="absolute top-[12px] right-0 w-[70%] h-auto"
                      alt={category.alt}
                    />

                    {/**** Category button*/}
                    <button className="button w-full h-[44px] max-w-[230px] mx-auto mt-auto bg-gray-100 text-black font-medium flex items-center justify-center rounded-[7px] z-10 ">
                      {category.category}
                    </button>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </main>
      </div>
    </div>
  );
}
