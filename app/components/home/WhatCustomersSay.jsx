import React, { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";

import StarRating from "../ui/StarRating";

import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import customerImg1 from "@/public/customer-1.jpeg";
import customerImg2 from "@/public/customer-2.jpeg";
import customerImg3 from "@/public/customer-3.jpeg";
import customerImg4 from "@/public/customer-4.jpeg";
import customerImg5 from "@/public/customer-5.jpeg";
import customerImg6 from "@/public/customer-6.jpeg";

export default function WhatCustomersSay() {
  //Customers comments and information
  const customerComments = useMemo(
    () => [
      {
        rating: 5,
        comment:
          "This app makes shopping a breeze! The user interface is so smooth and intuitive. Definitely my new favorite shopping platform! Highly recommend",
        avatar: customerImg1,
        name: "Sophia Bennett",
        job: "Interior Designer",
      },
      {
        rating: 4,
        comment:
          "I've found so many amazing deals here. Just wish they'd add more payment options. Some features could be better, but overall, it's fantastic!. ",
        avatar: customerImg2,
        name: "Chloe Ramirez",
        job: "Fashion Blogger",
      },
      {
        rating: 5,
        comment:
          "An absolute game-changer for my online shopping! I love how everything is organized perfectly. The product quality was even better than I expected.",
        avatar: customerImg3,
        name: "Ava Thompson",
        job: "Freelance Photographer",
      },
      {
        rating: 4,
        comment:
          "Great variety and prices, but I did experience a slight delay in delivery once. The search functionality is also quite accurate, which makes finding products easy.",
        avatar: customerImg4,
        name: "Barry Allen",
        job: "Marketing Specialist",
      },
      {
        rating: 5,
        comment:
          "As someone who rarely shops online, this app has completely changed my perspective. The app is simple to use, and the tracking updates were super helpful. Super efficient!",
        avatar: customerImg5,
        name: "Ethan Sanders",
        job: "Software Developer",
      },
      {
        rating: 5,
        comment:
          "Everything I could want in a shopping app! The customer service is also top-notch. I also had a query about my order, and customer service resolved it within minutes. Love it!",
        avatar: customerImg6,
        name: "Mia Patel",
        job: "Graphic Designer",
      },
    ],
    []
  );

  //Ref for comments container
  const commentsContainerRef = useRef(null);

  //Animation for the comment boxes
  useEffect(() => {
    const commentBoxes =
      commentsContainerRef.current?.querySelectorAll(".comment-box");

    if (commentBoxes) {
      commentBoxes.forEach((box, index) => {
        gsap.from(box, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: index * 0.5, // Delay each box by 0.5s times its index
          ease: "power2.out",
          scrollTrigger: {
            trigger: commentsContainerRef.current,
            start: "top center", // When the container enters the viewport
            end: "top top", // When the container reaches the center
            //scrub: true, // Smooth animation
          },
        });
      });
    }
  }, []);

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
    <div className="w-full bg-gray-100">
      {/**** Inner container */}
      <div className="w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-8 md:py-20 md:space-y-7 lg:px-0">
        {/*** Header */}
        <header className="w-full flex gap-x-4 items-center justify-between">
          <h2 className="text-black text-[23px] md:text-3xl">
            What Our Customers Say
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

        {/*** Main list of comments */}
        <main className="w-full" ref={commentsContainerRef}>
          <Swiper
            spaceBetween={40}
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
            {customerComments.map((customer, index) => {
              return (
                <SwiperSlide className="w-full max-w-[373.33px]" key={index}>
                  <div className="comment-box relative w-full h-[250px] bg-white p-6 rounded-[14px] flex flex-col justify-center overflow-hidden">
                    {/*** Rating stars */}
                    <section className="flex">
                      <StarRating rating={customer.rating} />
                    </section>

                    {/*** Comment */}
                    <p className="text-black font-medium mt-4 line-clamp-4 text-ellipsis overflow-hidden">
                      {customer.comment}
                    </p>

                    {/*** Customer information */}
                    <section className="mt-7 grid grid-cols-[40px_auto] gap-4">
                      {/*** Customer avatar */}
                      <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden">
                        <Image
                          src={customer.avatar}
                          //className="w-full h-full"
                          alt={customer.name}
                          fill
                        />
                      </div>

                      {/*** Customer name and job */}
                      <div className="w-full flex flex-col justify-between">
                        <p className="w-full font-semibold">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.job}</p>
                      </div>
                    </section>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </main>
      </div>
    </div>
  );
}
