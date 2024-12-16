import { useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import { useCountdownToMonthEnd } from "@/app/hooks/useCountdownToMonthEnd";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import MainButton from "../ui/MainButton";

import { HiArrowRight } from "react-icons/hi2";

import dealsOfTheMonthImg from "@/public/dealsOfTheMonth.png";

export default function DealsOfTheMonth() {
  //Time remaining till end of the month
  const {
    days: daysRemaining,
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining,
  } = useCountdownToMonthEnd();

  //Ref for section container
  const dealsOfTheMonthContainer = useRef(null);

  //GSAP animations
  useGSAP(
    () => {
      //Heading animation
      gsap.from(".heading", {
        opacity: 0,
        y: "100%",
        duration: 0.5,
        immediateRender: false,
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "top center", // Adjust as necessary
          end: "top center", // Adjust as necessary
        },
      });

      //Description animation
      gsap.from(".description", {
        opacity: 0,
        y: "100%",
        duration: 0.5,
        immediateRender: false,
        delay: 0.7,
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "top center", // Adjust as necessary
          end: "top center", // Adjust as necessary
        },
      });

      //Time boxes animation
      gsap.from(".time-boxes", {
        opacity: 0,
        y: "100%",
        duration: 0.5,
        immediateRender: false,
        delay: 1.4,
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "top center", // Adjust as necessary
          end: "top center", // Adjust as necessary
        },
      });

      //Button animation
      gsap.from(".button", {
        opacity: 0,
        y: "100%",
        duration: 0.5,
        immediateRender: false,
        delay: 2.1,
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "top center", // Adjust as necessary
          end: "top center", // Adjust as necessary
        },
      });

      //Animation for image
      gsap.to(".image", {
        duration: 0.7,
        ease: "power2.inOut",
        rotate: "10deg",
        immediateRender: false,
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "bottom bottom", // Adjust as necessary
          end: "top top", // Adjust as necessary
        },
      });
      gsap.to(".image", {
        duration: 0.7,
        delay: 0.7,
        ease: "power2.inOut",
        immediateRender: false,
        rotate: "-10deg",
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "bottom bottom", // Adjust as necessary
          end: "top top", // Adjust as necessary
        },
      });
      gsap.to(".image", {
        duration: 0.7,
        delay: 1.4,
        immediateRender: false,
        ease: "power2.inOut",
        rotate: "0deg",
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "bottom bottom", // Adjust as necessary
          end: "top top", // Adjust as necessary
        },
      });

      //Animation for red bg pattern
      gsap.from(".red-bg", {
        duration: 2.5,
        ease: "power2.inOut",
        skewX: "0deg",
        immediateRender: false,
        scrollTrigger: {
          trigger: dealsOfTheMonthContainer.current,
          start: "bottom bottom", // Adjust as necessary
          end: "top top", // Adjust as necessary
        },
      });
    },
    { scope: dealsOfTheMonthContainer }
  );

  return (
    <div className="w-full">
      {/**** Inner container */}
      <div
        className="unx w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-6 md:py-20 md:space-y-7 lg:px-0 lg:flex lg:items-center lg:gap-x-12"
        ref={dealsOfTheMonthContainer}
      >
        {/*** Texts section */}
        <section className="w-full space-y-3">
          <h2 className="heading text-black text-[23px] text-center md:text-3xl lg:text-left">
            Deals Of The Month
          </h2>

          <p className="description w-full max-w-[550px] mx-auto text-black text-base text-center md:text-lg lg:mx-0 lg:text-left ">
            Discover incredible savings with our Deals of the Month! Each month,
            we curate a selection of exclusive offers on your favorite products,
            ensuring you get the best value for your money. Don&apos;t miss out
            on these limited-time offers—shop now and enjoy fantastic discounts
            while they last!
          </p>

          {/*** Countdown timer till month end */}
          <section className="time-boxes flex items-center justify-center flex-wrap gap-3 !my-6 md:gap-6 lg:justify-start">
            <div className="time-box-1 w-[70px] h-[70px] border-[1.5px] border-gray-300 flex flex-col items-center justify-center rounded-[6px] md:w-[85px] md:h-[85px]">
              <p className="font-semibold text-[22px] md:text-3xl">
                {daysRemaining}
              </p>
              <p className="text-lg md:text-xl">
                {daysRemaining > 1 ? "Days" : "Day"}
              </p>
            </div>

            <div className="time-box-2 w-[70px] h-[70px] border-[1.5px] border-gray-300 flex flex-col items-center justify-center rounded-[6px] md:w-[85px] md:h-[85px]">
              <p className="font-semibold text-[22px] md:text-3xl">
                {hoursRemaining}
              </p>
              <p className="text-lg">{hoursRemaining > 1 ? "Hours" : "Hour"}</p>
            </div>

            <div className="time-box-3 w-[70px] h-[70px] border-[1.5px] border-gray-300 flex flex-col items-center justify-center rounded-[6px] md:w-[85px] md:h-[85px]">
              <p className="font-semibold text-[22px] md:text-3xl">
                {minutesRemaining}
              </p>
              <p className="text-lg">{minutesRemaining > 1 ? "Mins" : "Min"}</p>
            </div>

            <div className="time-box-4 w-[70px] h-[70px] border-[1.5px] border-gray-300 flex flex-col items-center justify-center rounded-[6px] md:w-[85px] md:h-[85px]">
              <p className="font-semibold text-[22px] md:text-3xl">
                {secondsRemaining}
              </p>
              <p className="text-lg">{secondsRemaining > 1 ? "Secs" : "Sec"}</p>
            </div>
          </section>

          {/**** View products button */}
          <Link href="/shop" className="block w-max mx-auto lg:mx-0">
            <MainButton className="button gap-x-2 !h-[50px] !lg:h-[60px]">
              View All Products <HiArrowRight className="text-white text-sm" />
            </MainButton>
          </Link>
        </section>

        {/*** Image section */}
        <section className="hidden w-full h-[570px] bg-gray-200 overflow-hidden lg:relative lg:flex">
          <Image
            src={dealsOfTheMonthImg}
            className="image absolute top-0 right-0 w-[70%] h-auto z-10"
            alt="beautiful woman dressed"
            style={{ objectFit: "cover" }} // Use style prop for object-fit
          />

          <div className="red-bg absolute top-0 right-0 w-1/2 h-[120%] bg-errorRed transform -skew-x-[24deg]"></div>
        </section>
      </div>
    </div>
  );
}
