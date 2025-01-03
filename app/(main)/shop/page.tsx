"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import useFetchShopItems from "@/app/actions/shop/useFetchShopItems";

import { useShopBreadcrumb } from "./contexts/ShopBreadcrumbContext";

import { CircularProgress } from "@mui/material";

import { shuffleArray } from "@/app/utils/helpers";

import ShopItem from "@/app/components/ui/ShopItem";
import PaginationButtons from "@/app/components/ui/PaginationButtons";
import MainButton from "@/app/components/ui/MainButton";

import ShopCategoriesAndFilters from "./components/ShopCategoriesAndFilters";

import { GrAppsRounded, GrSort } from "react-icons/gr";

import failedToLoadImg from "@/public/failedToLoad.svg";

export default function Shop() {
  //Search params function
  const searchParams = useSearchParams();

  // Get the current pathname
  const pathname = usePathname();

  //Fetch shop items
  const { isLoading: isFetchingShopItems } = useFetchShopItems();

  //Shop items from redux state
  const shopItems = useAppSelector(
    (state: ReduxStoreState) => state.shop.items
  );

  //Display only 15 items per page
  const itemsPerPage = 15;

  //Randomize shop items on every page mount
  const randomizedShopItemsRef = useRef<ShopItemModel[]>([]); //shuffleArray(shopItems);

  //Filtered shop items after randomized
  //Thats why its initialized to randomized shop items
  const [filteredShopItems, setFilteredShopItems] = useState<ShopItemModel[]>(
    randomizedShopItemsRef.current
  );

  //Current page showing shop items, set to 1 on load
  const currentPage = parseInt(searchParams.get("page")!) || 1;

  //Total pages possibled to be rendered for the filtered shop items
  const totalPages = Math.ceil(filteredShopItems.length / itemsPerPage);

  //Check if current page param exceeds totalPages
  const exceedsTotalPages = currentPage > totalPages;

  //Currently displayed shop items
  const [currentDisplayedShopItems, setCurrentDisplayedShopItems] = useState<
    ShopItemModel[]
  >([]);

  //One-indexed index of the first and last items of a page
  const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastItemIndex = Math.min(
    currentPage * itemsPerPage,
    filteredShopItems.length
  );

  // This effect runs only on mount to shuffle items once
  useEffect(() => {
    if (randomizedShopItemsRef.current.length === 0 && shopItems.length) {
      randomizedShopItemsRef.current = shuffleArray(shopItems);
      setFilteredShopItems(randomizedShopItemsRef.current);
    }
  }, [shopItems]); // Only run once when shopItems change

  // This effect updates the displayed items on page change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setCurrentDisplayedShopItems(filteredShopItems.slice(startIndex, endIndex));
  }, [currentPage, filteredShopItems]); // Runs on page or filteredShopItems change

  //State of the categories and filters sidebar showcase
  const [isCategoriesAndFiltersOpen, setIsCategoriesAndFiltersOpen] =
    useState<boolean>(false);

  //State of the filtering error
  const [filterError, setFilterError] = useState(false);

  //Handles the state of categories and filters
  const handleSetIsCategoriesAndFiltersOpen = useCallback((val: boolean) => {
    setIsCategoriesAndFiltersOpen(val);
  }, []);

  // Effect to handle route changes
  useEffect(() => {
    // Close categories and filter modal on route change
    setIsCategoriesAndFiltersOpen(false);
  }, [pathname]); // Dependency array includes pathname

  //Function to open or close mobile navbar
  function toggleCategoriesAndFilters() {
    setIsCategoriesAndFiltersOpen((prev) => !prev);
  }

  //Set breadcrumb
  const { setShopBreadcrumb } = useShopBreadcrumb();

  useEffect(() => {
    setShopBreadcrumb(["Home", "Shop", "All Products"]);

    return () => {
      setShopBreadcrumb([]);
    };
  }, [setShopBreadcrumb]);

  //Show loading spinner if fetching shop items
  if (isFetchingShopItems)
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
        <CircularProgress color="inherit" size={40} />
      </div>
    );

  //Show error if there's no shop item yet
  if (!currentDisplayedShopItems.length && !exceedsTotalPages)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
        <Image
          src={failedToLoadImg}
          className="w-full max-w-[200px] md:max-w-[300px]"
          alt="Failed to load error image"
        />
        <p className="text-base text-center md:text-lg">
          {shopItems.length === 0
            ? "Failed to load shop products"
            : "No shop items found"}
        </p>
      </div>
    );

  return (
    <div className="lg:flex">
      {/*** Shop categories and filters section */}
      {
        <ShopCategoriesAndFilters
          isOpen={isCategoriesAndFiltersOpen}
          setIsOpen={handleSetIsCategoriesAndFiltersOpen}
          randomizedShopItems={randomizedShopItemsRef.current}
          setFilteredShopItems={setFilteredShopItems}
          setFilterError={setFilterError}
        />
      }

      {/*** Main section of shop */}
      <main className="w-full space-y-4 md:space-y-7">
        {/*** Pagination infomation */}
        <section className="w-full flex items-center flex-wrap gap-3 md:gap-6">
          {/*** Icons */}
          <div className="flex items-center gap-x-3">
            <GrAppsRounded
              className="text-xl text-black inline-block md:text-[22px]"
              onClick={toggleCategoriesAndFilters}
            />

            <GrSort
              className="text-lg text-black inline-block md:text-lg"
              onClick={toggleCategoriesAndFilters}
            />
          </div>

          {/*** Pagination info showcase */}
          {!exceedsTotalPages && !filterError && (
            <span className="text-sm md:text-base">
              Showing {firstItemIndex} - {lastItemIndex} of{" "}
              {filteredShopItems.length} results
            </span>
          )}
        </section>

        {/*** Currently displayed shop items */}
        {exceedsTotalPages || filterError ? (
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
              <MainButton>Back to Shop</MainButton>
            </Link>
          </div>
        ) : (
          <section className="flex justify-center flex-wrap gap-[30px] gap-y-[50px]">
            {currentDisplayedShopItems.map((item) => {
              return <ShopItem shopItem={item} key={item.id} />;
            })}
          </section>
        )}

        {/*** Pagination buttons */}
        {!exceedsTotalPages && !filterError && (
          <PaginationButtons
            items={filteredShopItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        )}
      </main>
    </div>
  );
}
