"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Image from "next/image";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { useShopBreadcrumb } from "../contexts/ShopBreadcrumbContext";

import useFetchCurrentShopItem from "@/app/actions/shop/useFetchCurrentShopItem";

import { formatToSupabaseImageUrl } from "@/app/lib/supabase";

import { CircularProgress } from "@mui/material";

import { capitalizeText, formatToCurrency } from "@/app/utils/helpers";

import StarRatingWithEmpty from "@/app/components/ui/StarRatingWithEmpty";

import { FaMinus, FaPlus } from "react-icons/fa6";

import noImgPlaceholder from "@/public/no-image-placeholder.svg";
import MainButton from "@/app/components/ui/MainButton";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import ShopItemPageTab from "../components/ShopItemPageTab";

export default function ShopItemPage() {
  //Route parameters
  const params = useParams();

  //Shop item id
  const shopItemId = params.shopItemId!;

  //Fetch current shop item
  const { isLoading: isFetchingCurrentItem } = useFetchCurrentShopItem(
    String(shopItemId)
  );

  //Current shop item from redux state
  const currentShopItem = useAppSelector(
    (state: ReduxStoreState) => state.shop.currentItem
  );

  //Current shop item key-values
  const itemBrand = currentShopItem?.brand;
  const itemTitle = currentShopItem?.title;
  const itemImage = currentShopItem?.image;
  const itemImageUrl =
    itemImage &&
    formatToSupabaseImageUrl("productImages", itemImage.toString());
  const isItemInStock = currentShopItem?.inStock;
  const itemAvgRating = currentShopItem?.averageRating;
  const numberOfReviews = currentShopItem?.numberOfReviews;
  const itemPrice = Number(currentShopItem?.price);
  const itemDiscount = Number(currentShopItem?.discount);
  const itemDescription = currentShopItem?.description;
  const itemColorsAvailable = currentShopItem?.colorsAvailable;
  const itemSizesAvailable = currentShopItem?.sizesAvailable;

  //Quantity to add to cart
  const [itemQuantity, setItemQuantity] = useState(1);

  //Check if item is in wishlist
  const isItemInWishlist = true;

  //Function to increase and decrease item quantity
  function handleIncreaseItemQuantity() {
    setItemQuantity((prev) => prev + 1);
  }

  function handleDecreaseItemQuantity() {
    if (itemQuantity > 1) {
      setItemQuantity((prev) => prev - 1);
    }
  }

  //Set breadcrumb if title exists
  const { setShopBreadcrumb } = useShopBreadcrumb();

  useEffect(() => {
    if (itemTitle) {
      setShopBreadcrumb(["Home", "Shop", itemTitle]);

      return () => {
        setShopBreadcrumb([]);
      };
    }
  }, [setShopBreadcrumb, itemTitle]);

  //Show loading spinner if fetching shop items
  if (isFetchingCurrentItem)
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
        <CircularProgress color="inherit" size={40} />
      </div>
    );

  return (
    <div className="w-full space-y-3">
      {/** Shop item image */}
      <section className="relative w-full h-[350px] shadow-md border-t-[1px] border-gray-200">
        <Image
          src={itemImageUrl || noImgPlaceholder}
          alt={String(itemTitle) || "Image not available"}
          fill
          //objectFit="cover" // Adjust image scaling
          style={{ objectFit: "cover" }} // Use style prop for object-fit
        />
      </section>

      {/*** Shop item details */}
      <main className="w-full text-black">
        <div className="space-y-2">
          {/*** Display if item is in stock or not */}
          {isItemInStock ? (
            <span className="inline-block px-3 py-1 bg-green-100 text-green-400 font-medium text-[13px] rounded-[5px]">
              In stock
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-red-100 text-red-400 font-medium text-[13px] rounded-[5px]">
              Out of Stock
            </span>
          )}

          {/*** Brand of item */}
          <h3 className="text-[18px] md:text-[20px] font-medium">
            {itemBrand}
          </h3>

          {/*** Title of item */}
          <h4 className="text-[17px] md:text-[19px]">
            {capitalizeText(String(itemTitle))}
          </h4>

          {/*** Star rating */}
          <section className="flex items-center gap-x-2">
            {Boolean(itemAvgRating) && (
              <StarRatingWithEmpty rating={Number(itemAvgRating)} />
            )}
            <span className="text-[16px] text-gray-400 md:text-[18px]">
              {itemAvgRating} ({numberOfReviews} Reviews)
            </span>
          </section>

          {/** Price display and special showcase if there is a discount */}
          <section className="flex items-center gap-x-2">
            <span className="font-medium">
              {itemDiscount > 0 ? (
                <div className="inline space-x-[0.1rem]">
                  <span className="font-roboto">₦</span>
                  <span>{formatToCurrency(itemPrice - itemDiscount)}</span>
                </div>
              ) : (
                <div className="inline">
                  <span className="font-roboto">₦</span>
                  <span>{formatToCurrency(itemPrice)}</span>
                </div>
              )}
            </span>
            <span className="text-gray-400 line-through">
              {itemDiscount > 0 && (
                <div className="inline">
                  <span className="font-roboto">₦</span>
                  <span>{formatToCurrency(itemPrice)}</span>
                </div>
              )}
            </span>
          </section>

          {/** Item description */}
          <p className="text-[15px] md:text-[17px]">{itemDescription}</p>

          {/** Colors available */}
          {Array.isArray(itemColorsAvailable) &&
            itemColorsAvailable.length > 0 && (
              <section className="space-y-1">
                <h6 className="text-base font-medium md:text-lg">Colors</h6>

                <main className="flex items-center flex-wrap gap-2">
                  {itemColorsAvailable.map((color, index) => (
                    <div
                      className="w-6 h-6 rounded-[5px]"
                      style={{ backgroundColor: color }}
                      key={index}
                    ></div>
                  ))}
                </main>
              </section>
            )}

          {/** Sizes available */}
          {Array.isArray(itemSizesAvailable) &&
            itemSizesAvailable.length > 0 && (
              <section className="space-y-1">
                <h6 className="text-base font-medium md:text-lg">Sizes</h6>

                <main className="flex items-center flex-wrap gap-2">
                  {itemSizesAvailable.map((size, index) => (
                    <div
                      className="w-max h-max min-w-8 p-1 border-[2px] border-black rounded-[5px] flex items-center justify-center text-[13px]"
                      key={index}
                    >
                      <span>{size}</span>
                    </div>
                  ))}
                </main>
              </section>
            )}

          {/*** Cart & Wishlist */}
          <section className="!mt-4 space-y-2">
            {/** Item quantity */}
            <div className="h-[40px] w-[100px] rounded-[8px] py-1 px-2 border-[2px] border-black flex items-center justify-between">
              <FaMinus
                className="text-black text-[12px]"
                onClick={handleDecreaseItemQuantity}
              />

              <span className="text-[15px] md:text-[17px]">{itemQuantity}</span>

              <FaPlus
                className="text-black text-[12px]"
                onClick={handleIncreaseItemQuantity}
              />
            </div>

            {/** Add to cart button */}
            <MainButton className="w-full">Add to Cart</MainButton>

            {/** Wishlist toggle button */}
            <div className="w-[35px] h-[35px] rounded-[8px] border-[2px] border-black flex items-center justify-center">
              {!isItemInWishlist ? (
                <PiHeartFill className="text-black text-lg" />
              ) : (
                <PiHeart className="text-black text-lg" />
              )}
            </div>
          </section>

          {/** Shop item tab */}
          {currentShopItem && <ShopItemPageTab shopItem={currentShopItem} />}
        </div>
      </main>
    </div>
  );
}
