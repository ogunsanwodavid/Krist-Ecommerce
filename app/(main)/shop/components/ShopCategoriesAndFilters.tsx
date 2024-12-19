import { ShopItem as ShopItemModel } from "@/app/models/shop";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import ShopPriceRangeFilter from "./ShopPriceRangeFilter";

interface ShopCategoriesAndFiltersProps {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  randomizedShopItems: ShopItemModel[];
  setFilteredShopItems: (array: ShopItemModel[]) => void;
}

export default function ShopCategoriesAndFilters({
  isOpen,
  setIsOpen,
  randomizedShopItems,
  setFilteredShopItems,
}: ShopCategoriesAndFiltersProps) {
  //Router function
  const router = useRouter();

  //Search params function
  const searchParams = useSearchParams();

  //Function to close this section on mobile
  function handleClose() {
    setIsOpen(false);
  }

  //States to open or close different accordions
  const [isProductCategoriesOpen, setIsProductCategoriesOpen] = useState(false);
  const [isFilterByPriceOpen, setIsFilterByPriceOpen] = useState(false);

  //Product categories
  const productCategories = [
    "men",
    "women",
    "kids",
    "bags",
    "watches",
    "headwear",
    "shoes",
  ];

  // State to keep track of shop items filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  //Calculate price range
  function calculatePriceRange() {
    let maxPriceRange = 0;
    let minPriceRange = Infinity;

    // Determine the source array
    //const sourceItems = randomizedShopItems;
    //filteredShopItems.length > 0 ? filteredShopItems : randomizedShopItems;

    // Iterate through the array
    randomizedShopItems.forEach((item) => {
      const effectivePrice = item.price - item.discount;

      // Update max and min prices
      if (effectivePrice > maxPriceRange) {
        maxPriceRange = effectivePrice;
      }
      if (effectivePrice < minPriceRange) {
        minPriceRange = effectivePrice;
      }
    });

    // Handle the case where the array is empty
    if (randomizedShopItems.length === 0) {
      maxPriceRange = 0;
      minPriceRange = 0;
    }

    return { maxPriceRange, minPriceRange };
  }

  const { maxPriceRange, minPriceRange } = calculatePriceRange();

  // Function to handle category selection change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  //Function to handle mininum price change
  const handleMinPriceChange = (value: string | undefined) => {
    setMinPrice(value ? parseFloat(value) : null);
  };

  //Function to handle maximum price change
  const handleMaxPriceChange = (value: string | undefined) => {
    setMaxPrice(value ? parseFloat(value) : null);
  };

  // Sync filter states with URL params
  useEffect(() => {
    const urlCategories = searchParams.get("categories");

    if (urlCategories) {
      setSelectedCategories(urlCategories.split(","));
    }

    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");

    setMinPrice(urlMinPrice ? parseFloat(urlMinPrice) : null);
    setMaxPrice(urlMaxPrice ? parseFloat(urlMaxPrice) : null);
  }, [searchParams]);

  // Function to apply filters
  const applyFilters = useCallback(() => {
    let filtered = [...randomizedShopItems];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // Filter by price range
    if (minPrice !== null) {
      filtered = filtered.filter((item) => item.price >= minPrice);
    }
    if (maxPrice !== null) {
      filtered = filtered.filter((item) => item.price <= maxPrice);
    }

    setFilteredShopItems(filtered);
  }, [
    randomizedShopItems,
    selectedCategories,
    minPrice,
    maxPrice,
    setFilteredShopItems,
  ]);

  // Trigger filter updates when filters change
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, applyFilters]);

  /*   // Function to update URL params for categories
  const updateURLParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }

    router.push(`?${params.toString()}`);
  }, [router, selectedCategories, searchParams]); */

  const updateURLParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    // Check if categories have changed
    const currentCategories = params.get("categories")?.split(",") || [];
    const categoriesChanged =
      currentCategories.length !== selectedCategories.length ||
      !currentCategories.every((cat) => selectedCategories.includes(cat));

    // Check if minPrice or maxPrice have changed
    const currentMinPrice = params.get("minPrice");
    const currentMaxPrice = params.get("maxPrice");
    const minPriceChanged =
      (currentMinPrice !== null && parseFloat(currentMinPrice) !== minPrice) ||
      (currentMinPrice === null && minPrice !== null);
    const maxPriceChanged =
      (currentMaxPrice !== null && parseFloat(currentMaxPrice) !== maxPrice) ||
      (currentMaxPrice === null && maxPrice !== null);

    // Remove the page param if any filter has changed
    if (categoriesChanged || minPriceChanged || maxPriceChanged) {
      params.delete("page");
    }

    // Update categories
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    // Update minPrice and maxPrice
    if (minPrice !== null) {
      params.set("minPrice", minPrice.toString());
    } else {
      params.delete("minPrice");
    }
    if (maxPrice !== null) {
      params.set("maxPrice", maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    // Update the router with the new parameters
    router.push(`?${params.toString()}`);
  }, [router, selectedCategories, minPrice, maxPrice, searchParams]);

  // Trigger URL params update whenever filters change
  useEffect(() => {
    updateURLParams();
  }, [selectedCategories, updateURLParams]);

  return (
    <div
      className={`${
        !isOpen ? "!w-0" : "w-full"
      } fixed left-0 top-[61px] h-full max-w-[277.5px] bg-white z-30 shadow-md transition-all duration-300 ease-in-out overflow-hidden flex flex-col md:top-[67px] lg:top-0 lg:h-max lg:block lg:!relative lg:!w-[277.5px] lg:mr-[30px] lg:flex-shrink-0 `}
    >
      {/*** Inner container */}
      <div className="w-full p-4 space-y-3 text-black">
        {/*** Close button */}
        <div
          className="w-max ml-auto bg-gray-100 border-black border-[1.5px] p-1 rounded-[6px] lg:hidden"
          onClick={handleClose}
        >
          <CgClose className="text-black text-lg " />
        </div>
        {/*** Main section */}
        <main className="w-full space-y-4">
          {/*** Sort by product categories */}
          <section className="space-y-2">
            <header
              className="flex items-center justify-between"
              onClick={() => setIsProductCategoriesOpen((prev) => !prev)}
            >
              <p className="text-[17px] font-semibold md:text-[19px]">
                Product Categories
              </p>

              {isProductCategoriesOpen ? (
                <PiCaretDownBold className="text-lg text-black" />
              ) : (
                <PiCaretUpBold className="text-lg text-black" />
              )}
            </header>

            <main
              className={`space-y-4 lg:space-y-5 ${
                !isProductCategoriesOpen && "hidden"
              }`}
            >
              {productCategories.map((category) => {
                return (
                  <label className="flex items-center gap-x-3" key={category}>
                    {/*** Hidden input */}
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="hidden peer"
                    />

                    {/* Custom Checkbox */}
                    <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black lg:w-5 lg:h-5">
                      <FaCheck className="text-white text-[0.6rem] lg:text-[0.8rem]" />
                    </span>

                    <span className="capitalize md:text-lg">{category}</span>
                  </label>
                );
              })}
            </main>
          </section>

          {/*** Filter by price */}
          <section className="space-y-2">
            <header
              className="flex items-center justify-between"
              onClick={() => setIsFilterByPriceOpen((prev) => !prev)}
            >
              <p className="text-[17px] font-semibold md:text-[19px]">
                Filter By Price
              </p>

              {isFilterByPriceOpen ? (
                <PiCaretDownBold className="text-lg text-black" />
              ) : (
                <PiCaretUpBold className="text-lg text-black" />
              )}
            </header>

            <main
              className={`space-y-4 lg:space-y-5 ${
                !isFilterByPriceOpen && "hidden"
              }`}
            >
              <ShopPriceRangeFilter
                min={minPriceRange}
                max={maxPriceRange}
                handleMinChange={handleMinPriceChange}
                handleMaxChange={handleMaxPriceChange}
              />
            </main>
          </section>
        </main>
      </div>
    </div>
  );
}
