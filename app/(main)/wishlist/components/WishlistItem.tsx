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

import FormatCurrencyNaira from "@/app/components/ui/FormatCurrencyNaira";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { PiHeart, PiHeartFill } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";

interface WishlistItemProps {
  wishlistItem: ShopItemModel;
}

export default function WishlistItem({ wishlistItem }: WishlistItemProps) {
  //SHop item image supabase url
  const itemImageUrl = formatToSupabaseImageUrl(
    "productImages",
    wishlistItem.image
  );

  //Wishlist item ref
  const wishlistItemRef = useRef(null);

  //Animation sequence
  useGSAP(
    () => {
      gsap.from(".wishlist-btn", {
        opacity: 0,
        x: "100%",
        duration: 0.8,
        scrollTrigger: {
          trigger: wishlistItemRef.current,
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
          trigger: wishlistItemRef.current,
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
          trigger: wishlistItemRef.current,
          start: "bottom bottom",
          end: "bottom bottom",
          //scrub: true,
        },
      });
    },
    { scope: wishlistItemRef }
  );

  //Wishlist item id
  const wishlistItemId = wishlistItem.id;

  //Is item out of stock
  const isOutOfStock = !wishlistItem.inStock;

  //Add item to cart
  const addItemToCart = useAddItemToCart(wishlistItem);

  //Wishlist items from redux state
  const wishlistItems = useAppSelector(
    (state: ReduxStoreState) => state.wishlist.items
  );

  //Check if item already exists in the wishlist
  const isItemInWishlist = wishlistItems.some(
    (item) => item.id === wishlistItemId
  );

  //Function to remove item from wishlist
  const removeItemFromWishlist = RemoveItemFromWishlist(wishlistItemId);

  //Function to remove item from wishlist
  function handleRemoveFromWishlist(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    removeItemFromWishlist();
  }

  //Function to move item to cart
  function handleMoveToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    //Check if item will trigger variation modal or not
    const itemWillTriggerVariationModal =
      wishlistItem.sizesAvailable || wishlistItem.colorsAvailable;

    //Add to cart
    if (isOutOfStock) {
      toast.error("Item is out of stock");
    } else {
      addItemToCart();
    }

    //Remove from wishlist if item wont trigger variation modal
    if (!itemWillTriggerVariationModal) {
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
      href={`/shop/${wishlistItemId}`}
      className="w-full max-w-[277.5px] space-y-6"
    >
      {/**** Item box */}
      <section
        className="relative w-full h-[350px] bg-gray-200  p-3 flex flex-col overflow-hidden"
        ref={wishlistItemRef}
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
            alt={wishlistItem.title}
            sizes="100%"
          />
        </div>

        {/*** Buttons */}
        <section className="w-max h-max ml-auto space-y-3 z-10">
          {/*** Remove from wishlist button */}
          <div
            className="wishlist-btn w-[35px] h-[35px] bg-gray-100 rounded-full flex items-center justify-center"
            onClick={handleRemoveFromWishlist}
          >
            <FaRegTrashAlt className="text-lg text-errorRed" />
          </div>
        </section>

        {/**** Move to cart button*/}
        <button
          className="button w-full h-[44px] max-w-[230px] mx-auto mt-auto bg-gray-100 text-black font-medium flex items-center justify-center rounded-[7px] z-10"
          onClick={handleMoveToCart}
        >
          Move to Cart
        </button>
      </section>

      {/** Item details */}
      <section className="w-full space-y-1 text-black">
        <h4 className="w-full text-base font-medium  whitespace-nowrap text-ellipsis overflow-hidden md:text-lg">
          {wishlistItem.title}
        </h4>

        <h5 className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden md:text-base">
          {wishlistItem.description}
        </h5>

        {/*** Price */}
        {/*** Show discounted price only when available */}
        <div className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden flex gap-x-2 md:text-base">
          <div className="font-medium">
            {wishlistItem.discount > 0 ? (
              <FormatCurrencyNaira
                amount={wishlistItem.price - wishlistItem.discount}
              />
            ) : (
              <FormatCurrencyNaira amount={wishlistItem.price} />
            )}
          </div>
          <div className="text-gray-400 line-through">
            {wishlistItem.discount > 0 && (
              <FormatCurrencyNaira
                amount={wishlistItem.price}
                textStyles="!line-through"
              />
            )}
          </div>
        </div>
      </section>
    </Link>
  );
}
