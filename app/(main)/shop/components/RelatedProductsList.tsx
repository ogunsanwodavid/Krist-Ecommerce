import { useEffect, useState } from "react";

import Image from "next/image";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import useFetchShopItems from "@/app/actions/shop/useFetchShopItems";

import { shuffleArray } from "@/app/utils/helpers";

import { CircularProgress } from "@mui/material";

import RelatedProduct from "./RelatedProduct";

import failedToLoadImg from "@/public/failedToLoad.svg";

interface RelatedProductsListProps {
  category: string;
  itemId: number;
}

export default function RelatedProductsList({
  category,
  itemId,
}: RelatedProductsListProps) {
  //Fetch shop items
  const { isLoading: isFetchingShopItems } = useFetchShopItems();

  //Shop items from redux state
  const shopItems = useAppSelector(
    (state: ReduxStoreState) => state.shop.items
  );

  //Related shop products
  const [relatedShopItems, setRelatedShopItems] = useState<ShopItemModel[]>([]);

  //Set related shop items based on the category
  //Shuffle the items and get only the first 4 for display
  useEffect(() => {
    if (category) {
      const relatedItems = shopItems.filter(
        (item) => item.category === category && item.id !== itemId
      );
      setRelatedShopItems(shuffleArray(relatedItems).slice(0, 4));
    }
  }, [category, shopItems, itemId]);

  return (
    <div className="my-12 space-y-3 md:space-y-6 md:mb-120">
      {/** Header */}
      <header>
        <h3 className="text-[22px] text-center md:text-[24px]">
          Related Products
        </h3>
      </header>

      {/** Main list of related products */}
      {/*** Show spinner while loading shop items */}
      {/*** Show error section if shop items fails to load */}
      {isFetchingShopItems ? (
        <div className="w-full flex items-center justify-center py-6 text-black lg:py-12">
          <CircularProgress color="inherit" size={40} />
        </div>
      ) : relatedShopItems.length ? (
        <main className="flex justify-center flex-wrap gap-[30px] gap-y-[50px]">
          {relatedShopItems.map((item) => {
            return <RelatedProduct shopItem={item} key={item.id} />;
          })}
        </main>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-3 py-3 text-black lg:py-6">
          <Image
            src={failedToLoadImg}
            className="w-full max-w-[200px] md:max-w-[300px]"
            alt="Failed to load error image"
          />
          <p className="text-base md:text-lg">Failed to load best sellers</p>
        </div>
      )}
    </div>
  );
}
