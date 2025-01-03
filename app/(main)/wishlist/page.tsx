"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useSearchParams } from "next/navigation";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import MainButton from "@/app/components/ui/MainButton";
import PaginationButtons from "@/app/components/ui/PaginationButtons";

import WishlistItem from "./components/WishlistItem";

import failedToLoadImg from "@/public/failedToLoad.svg";

export default function WishList() {
  //Search params function
  const searchParams = useSearchParams();

  //Wishlist items from redux state
  const wishlistItems: ShopItemModel[] = useAppSelector(
    (state: ReduxStoreState) => state.wishlist.items
  );

  //Display only 15 items per page
  const itemsPerPage = 20;

  //Current page showing wishlist items, set to 1 on load
  const currentPage = parseInt(searchParams.get("page")!) || 1;

  //Total pages possibled to be rendered for the wishlist
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  //Check if current page param exceeds totalPages
  const exceedsTotalPages = currentPage > totalPages;

  //Currently displayed wishlist items
  const [currentDisplayedWishlistItems, setCurrentDisplayedWishlistItems] =
    useState<ShopItemModel[]>([]);

  //One-indexed index of the first and last items of a page
  const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastItemIndex = Math.min(
    currentPage * itemsPerPage,
    wishlistItems.length
  );

  // This effect updates the displayed items on page change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setCurrentDisplayedWishlistItems(wishlistItems.slice(startIndex, endIndex));
  }, [currentPage, wishlistItems]); // Runs on page or filteredShopItems change

  //Show error if there's no wishlist item
  if (wishlistItems.length === 0)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
        <Image
          src={failedToLoadImg}
          className="w-full max-w-[200px] md:max-w-[300px]"
          alt="Failed to load error image"
        />
        <p className="text-base text-center md:text-lg">
          Your wishlist is currently empty.
        </p>
        <Link href="/shop">
          <MainButton>Explore items</MainButton>
        </Link>
      </div>
    );

  return (
    <div className="space-y-3">
      {/** Main section of wishlist */}
      <main className="w-full space-y-4 md:space-y-7">
        {/*** Currently displayed shop items */}
        {exceedsTotalPages ? (
          <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
            <Image
              src={failedToLoadImg}
              className="w-full max-w-[200px] md:max-w-[300px]"
              alt="Failed to load error image"
            />

            <p className="text-base text-center md:text-lg">
              No results found for your filters on this page
            </p>

            <Link href="/shop">
              <MainButton>Go to Wishlist</MainButton>
            </Link>
          </div>
        ) : (
          <main className="space-y-3">
            {/** Heading */}
            <h2 className="text-black text-center text-[23px] leading-[23px] md:text-3xl lg:text-left">
              Wishlist
            </h2>

            {/*** Pagination info showcase */}
            {!exceedsTotalPages && (
              <p className="text-sm text-center md:text-base lg:text-left">
                Showing {firstItemIndex} - {lastItemIndex} of{" "}
                {wishlistItems.length} results
              </p>
            )}

            {/*** List of items */}
            <section className="flex justify-center flex-wrap gap-[30px] gap-y-[50px]">
              {currentDisplayedWishlistItems.map((item) => {
                return <WishlistItem wishlistItem={item} key={item.id} />;
              })}
            </section>
          </main>
        )}

        {/*** Pagination buttons */}
        {!exceedsTotalPages && (
          <PaginationButtons
            items={wishlistItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        )}
      </main>
    </div>
  );
}
