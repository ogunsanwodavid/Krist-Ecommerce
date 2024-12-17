"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import Image from "next/image";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import useFetchShopItems from "@/app/actions/useFetchShopItems";

import ShopItem from "@/app/components/ui/ShopItem";
import PaginationButtons from "@/app/components/ui/PaginationButtons";

import { shuffleArray } from "@/app/utils/helpers";

import { CircularProgress } from "@mui/material";

import failedToLoadImg from "@/public/failedToLoad.svg";
import { GrAppsRounded, GrSort } from "react-icons/gr";

export default function Shop() {
  //Search params function
  const searchParams = useSearchParams();

  //Fetch shop items
  const { isLoading: isFetchingShopItems } = useFetchShopItems();

  //Shop items from redux state
  const shopItems = useAppSelector((state: ReduxStoreState) => state.shop);

  //Display only 15 items per page
  const itemsPerPage = 15;

  //Randomize shop items on every page mount
  const randomizedShopItemsRef = useRef<ShopItemModel[]>([]); //shuffleArray(shopItems);

  //Current page showing shop items, set to 1 on load
  const currentPage = parseInt(searchParams.get("page")!) || 1;

  //Currently displayed shop items
  const [currentDisplayedShopItems, setCurrentDisplayedShopItems] = useState<
    ShopItemModel[]
  >([]);

  //One-indexed index of the first and last items of a page
  const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastItemIndex = Math.min(currentPage * itemsPerPage, shopItems.length);

  //THis effect randomizes shop items and update the items for current page displayed
  useEffect(() => {
    //Function to update items for the current page
    const updateCurrentDisplayedShopItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      setCurrentDisplayedShopItems(
        randomizedShopItemsRef.current.slice(startIndex, endIndex)
      );
    };

    //Randomize shop items if they exist
    if (randomizedShopItemsRef.current.length === 0) {
      randomizedShopItemsRef.current = shuffleArray(shopItems);
    }

    //Update current displayed items
    updateCurrentDisplayedShopItems();
  }, [shopItems, currentPage]);

  const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Suspense
        fallback={
          <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
            <CircularProgress color="inherit" size={40} />
          </div>
        }
      >
        {children}
      </Suspense>
    );
  };

  //Show loading spinner if fetching shop items
  if (isFetchingShopItems)
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
        <CircularProgress color="inherit" size={40} />
      </div>
    );

  //Show error if there's no shop item yet
  if (!currentDisplayedShopItems.length)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
        <Image
          src={failedToLoadImg}
          className="w-full max-w-[200px] md:max-w-[300px]"
          alt="Failed to load error image"
        />
        <p className="text-base md:text-lg">Failed to load shop products</p>
      </div>
    );

  return (
    <SuspenseWrapper>
      <div className="w-full">
        {/**** Inner container */}
        <div className="w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-6 md:py-10 md:space-y-7 lg:px-0">
          {/*** Pagination infomation */}
          <section className="w-full flex items-center flex-wrap gap-3 md:gap-6">
            {/*** Icons */}
            <div className="flex items-center gap-x-3">
              <GrAppsRounded className="text-xl text-black inline-block md:text-[22px]" />

              <GrSort className="text-lg text-black inline-block md:text-lg" />
            </div>

            {/*** Pagination info showcase */}
            <span className="text-sm md:text-base">
              Showing {firstItemIndex} - {lastItemIndex} of {shopItems.length}{" "}
              results
            </span>
          </section>

          {/*** Main list of RANDOMIZED shop products*/}
          <main className="flex justify-center flex-wrap gap-[30px] gap-y-[50px]">
            {currentDisplayedShopItems.map((item) => {
              return <ShopItem shopItem={item} key={item.id} />;
            })}
          </main>

          {/*** Pagination buttons */}
          <PaginationButtons
            items={randomizedShopItemsRef.current}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </SuspenseWrapper>
  );
}
