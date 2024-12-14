"use client";

import { CircularProgress } from "@mui/material";

import useFetchShopItems from "@/app/actions/useFetchShopItems";

import { ReduxStoreState } from "@/app/redux/store";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks/redux";

export default function BestSeller() {
  const { isLoading: isFetchingShopItems } = useFetchShopItems();

  const shopItems = useAppSelector((state: ReduxStoreState) => state.shop);

  useEffect(() => {
    if (!isFetchingShopItems) {
      console.log(shopItems);
    }
  }, [isFetchingShopItems, shopItems]);

  return (
    <div className="w-full">
      {/**** Inner container */}
      <div className="w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-6 md:py-10 md:space-y-7">
        {/*** Header */}
        <header className="w-full flex items-center justify-center">
          <h2 className="text-black text-xl text-center md:text-3xl">
            Our BestSeller
          </h2>
        </header>

        {/*** Main list of best sellers*/}
        {/*** Show spinner while loading shop items */}
        {isFetchingShopItems ? (
          <div className="w-full flex items-center justify-center py-6 text-black lg:py-12">
            <CircularProgress color="inherit" size={40} />
          </div>
        ) : (
          <main>{shopItems.map((item) => item.title)}</main>
        )}
      </div>
    </div>
  );
}
