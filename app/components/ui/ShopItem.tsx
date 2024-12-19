import Image from "next/image";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import { formatToSupabaseImageUrl } from "@/app/lib/supabase";

import FormatCurrencyNaira from "./FormatCurrencyNaira";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { PiHeart } from "react-icons/pi";

import { IoEyeOutline } from "react-icons/io5";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

interface ShopItemProps {
  shopItem: ShopItemModel;
}

export default function ShopItem({ shopItem }: ShopItemProps) {
  const itemImageUrl = formatToSupabaseImageUrl(
    "productImages",
    shopItem.image
  );

  const shopItemRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".wishlist-btn", {
        opacity: 0,
        x: "100%",
        duration: 0.8,
        scrollTrigger: {
          trigger: shopItemRef.current,
          start: "top center",
          end: "top center",
          //scrub: true,
        },
      });

      gsap.from(".showcase-btn", {
        opacity: 0,
        x: "100%",
        duration: 1.2,
        scrollTrigger: {
          trigger: shopItemRef.current,
          start: "top center",
          end: "top center",
          //scrub: true,
        },
      });

      gsap.from(".button", {
        opacity: 0,
        y: "100%",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: shopItemRef.current,
          start: "bottom bottom",
          end: "bottom bottom",
          //scrub: true,
        },
      });
    },
    { scope: shopItemRef }
  );

  return (
    <div className="w-full max-w-[277.5px] space-y-6">
      {/**** Item box */}
      <section
        className="relative w-full h-[350px] bg-gray-200  p-3 flex flex-col overflow-hidden"
        ref={shopItemRef}
        style={{
          boxShadow:
            "1px 1px 3px rgba(0, 0, 0, 0.2), -1px 1px 3px rgba(0, 0, 0, 0.2), 0px 3px 3px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/**** Category image */}
        <div className="absolute top-0 left-[50%] -translate-x-[50%] h-full w-full shrink-0">
          <Image
            src={itemImageUrl}
            fill // This allows the image to fill its parent container
            style={{ objectFit: "cover" }} // Use style prop for object-fit
            alt={shopItem.title}
            sizes="100%"
          />
        </div>

        {/*** Buttons */}
        <section className="w-max h-max ml-auto space-y-3 z-10">
          {/*** Add to wishlist button */}
          <div className="wishlist-btn w-[35px] h-[35px] bg-gray-100 rounded-full flex items-center justify-center">
            <PiHeart className="text-xl text-black" />
          </div>

          {/**** Showcase product button */}
          <div className="showcase-btn w-[35px] h-[35px] bg-gray-100 rounded-full flex items-center justify-center">
            <IoEyeOutline className="text-xl text-black" />
          </div>
        </section>

        {/**** Category button*/}
        <button className="button w-full h-[44px] max-w-[230px] mx-auto mt-auto bg-gray-100 text-black font-medium flex items-center justify-center rounded-[7px] z-10 ">
          Add to Cart
        </button>
      </section>

      {/** Item details */}
      <section className="w-full space-y-1 text-black">
        <h4 className="w-full text-base font-medium  whitespace-nowrap text-ellipsis overflow-hidden md:text-lg">
          {shopItem.title}
        </h4>

        <h5 className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden md:text-base">
          {shopItem.description}
        </h5>

        {/*** Price */}
        {/*** Show discounted price only when available */}
        <div className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden flex gap-x-2 md:text-base">
          <div className="font-medium">
            {/* {shopItem.discount > 0
              ? FormatCurrencyNaira(shopItem.price - shopItem.discount)
              : FormatCurrencyNaira(shopItem.price)} */}
            {shopItem.discount > 0 ? (
              <FormatCurrencyNaira
                amount={shopItem.price - shopItem.discount}
              />
            ) : (
              <FormatCurrencyNaira amount={shopItem.price} />
            )}
          </div>
          <div className="text-gray-400 line-through">
            {shopItem.discount > 0 && (
              <FormatCurrencyNaira amount={shopItem.price} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
