import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import { useAddItemToCart } from "@/app/actions/cart/useAddItemToCart";

import { AddItemToWishlist } from "@/app/actions/wishlist/AddItemToWishlist";
import { RemoveItemFromWishlist } from "@/app/actions/wishlist/RemoveItemFromWishlist";

import { useItemVariationModal } from "@/app/(main)/contexts/ItemVariationModalContext";

import { formatToSupabaseImageUrl } from "@/app/lib/supabase";

import { toast } from "react-toastify";

import FormatCurrencyNaira from "./FormatCurrencyNaira";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { PiHeart, PiHeartFill } from "react-icons/pi";

interface ShopItemProps {
  shopItem: ShopItemModel;
}

export default function ShopItem({ shopItem }: ShopItemProps) {
  //SHop item image supabase url
  const itemImageUrl = formatToSupabaseImageUrl(
    "productImages",
    shopItem.image
  );

  //Shop item ref
  const shopItemRef = useRef(null);

  //Animation sequence
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

  //Shop item id
  const shopItemId = shopItem.id;

  //Is item out of stock
  const isOutOfStock = !shopItem.inStock;

  //Add item to cart
  const addItemToCart = useAddItemToCart(shopItem);

  //Function to add item to cart if it isnt out of stock
  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (isOutOfStock) {
      toast.error("Item is out of stock");
    } else {
      addItemToCart();
    }
  }

  //Wishlist items from redux state
  const wishlistItems = useAppSelector(
    (state: ReduxStoreState) => state.wishlist.items
  );

  //Check if item already exists in the wishlist
  const isItemInWishlist = wishlistItems.some((item) => item.id === shopItemId);

  //Function to add item to wishlist
  const addItemToWishlist = AddItemToWishlist(shopItem);

  //Function to remove item from wishlist
  const removeItemFromWishlist = RemoveItemFromWishlist(shopItemId);

  //Function to toggle item from wishlist
  //Add if it doesnt exist before and remove if it does
  function handleToggleWishlist(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (!isItemInWishlist) {
      addItemToWishlist();
    } else {
      removeItemFromWishlist();
    }
  }

  //Close item variation modal on mount
  const { closeVariationModal } = useItemVariationModal();
  useEffect(() => {
    closeVariationModal();
  }, []);

  return (
    <Link
      href={`/shop/${shopItemId}`}
      className="w-full max-w-[277.5px] space-y-6"
    >
      {/**** Item box */}
      <section
        className="relative w-full h-[350px] bg-gray-200 p-3 flex flex-col overflow-hidden"
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
          <div
            className="wishlist-btn w-[35px] h-[35px] bg-gray-100 rounded-full flex items-center justify-center"
            onClick={handleToggleWishlist}
          >
            {isItemInWishlist ? (
              <PiHeartFill className="text-xl text-black" />
            ) : (
              <PiHeart className="text-xl text-black" />
            )}
          </div>
        </section>

        {/**** Add to cart button*/}
        <button
          className="button w-full h-[44px] max-w-[230px] mx-auto mt-auto bg-gray-100 text-black font-medium flex items-center justify-center rounded-[7px] z-10"
          onClick={handleAddToCart}
        >
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
              <FormatCurrencyNaira
                amount={shopItem.price}
                textStyles="!line-through"
              />
            )}
          </div>
        </div>
      </section>
    </Link>
  );
}
