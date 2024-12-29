"use client";

import React, { memo } from "react";

import Image from "next/image";

import { ReduxStoreState } from "@/app/redux/store";

import { useAppSelector } from "@/app/hooks/redux";

import ShopItem from "../ui/ShopItem";

import { CircularProgress } from "@mui/material";

import failedBestSellerLoadImg from "@/public/failedToLoad.svg";

const BestSeller = memo(
  ({ isFetchingShopItems }: { isFetchingShopItems: boolean }) => {
    //Shop items from redux state
    const shopItems = useAppSelector(
      (state: ReduxStoreState) => state.shop.items
    );

    //Top 8 Best seller items
    const bestSellerItems = [...shopItems] // Create a shallow copy
      .sort((a, b) => b.amountSold - a.amountSold) // Sort by amountSold in descending order
      .slice(0, 8); // Take the first 8 items

    /* //Ref for each best seller box
    const bestSellerBoxesRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

    // Initialize refs on render
    if (bestSellerBoxesRefs.current.length !== bestSellerItems.length) {
      bestSellerBoxesRefs.current = bestSellerItems.map(
        (_, i) => bestSellerBoxesRefs.current[i] || React.createRef()
      );
    }

    // GSAP animation for each box
    useEffect(() => {
      const animations = bestSellerBoxesRefs.current
        .map((ref) => {
          if (!ref.current) return null;

          const wishAnim = gsap.from(
            ref.current.querySelector(".wishlist-btn"),
            {
              opacity: 0,
              x: "100%",
              duration: 0.8,
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "top center",
                //scrub: true,
              },
            }
          );

          const showAnim = gsap.from(
            ref.current.querySelector(".showcase-btn"),
            {
              opacity: 0,
              x: "100%",
              duration: 1.2,
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "top center",
                //scrub: true,
              },
            }
          );

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

          return [buttonAnim, wishAnim, showAnim];
        })
        .filter(Boolean);

      return () => {
        // Cleanup ScrollTrigger and animations
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        animations.forEach((animArray) =>
          animArray?.forEach((anim) => anim?.kill())
        );
      };
    }, [bestSellerItems]); */

    return (
      <div className="w-full">
        {/**** Inner container */}
        <div className="w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-6 md:pt-20 md:pb-10 md:space-y-7 lg:px-0">
          {/*** Header */}
          <header className="w-full flex items-center justify-center">
            <h2 className="text-black text-[23px] text-center md:text-3xl">
              Our BestSeller
            </h2>
          </header>

          {/*** Main list of best sellers*/}
          {/*** Show spinner while loading shop items */}
          {/*** Show error section if shop items fails to load */}
          {isFetchingShopItems ? (
            <div className="w-full flex items-center justify-center py-6 text-black lg:py-12">
              <CircularProgress color="inherit" size={40} />
            </div>
          ) : bestSellerItems.length ? (
            <main className="flex justify-center flex-wrap gap-[30px] gap-y-[50px]">
              {bestSellerItems.map((item) => {
                return <ShopItem shopItem={item} key={item.id} />;
              })}
            </main>
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
              <Image
                src={failedBestSellerLoadImg}
                className="w-full max-w-[200px] md:max-w-[300px]"
                alt="Failed to load error image"
              />
              <p className="text-base md:text-lg">
                Failed to load best sellers
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Set a display name for better debugging in React DevTools
BestSeller.displayName = "BestSeller";

export default BestSeller;
