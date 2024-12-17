import { ShopItem as ShopItemModel } from "@/app/models/shop";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

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

  // Function to handle category selection change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Sync filter states with URL params
  useEffect(() => {
    const urlCategories = searchParams.get("categories");

    if (urlCategories) {
      setSelectedCategories(urlCategories.split(","));
    }
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

    setFilteredShopItems(filtered);
  }, [randomizedShopItems, selectedCategories, setFilteredShopItems]);

  // Trigger filter updates when filters change
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, applyFilters]);

  // Function to update URL params for categories
  const updateURLParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }

    router.push(`?${params.toString()}`);
  }, [router, selectedCategories, searchParams]);

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
        </main>
      </div>
    </div>
  );
}
