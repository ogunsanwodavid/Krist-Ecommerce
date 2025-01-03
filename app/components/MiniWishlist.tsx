import Image from "next/image";
import { useRouter } from "next/navigation";

import { ReduxStoreState } from "../redux/store";

import { useAppSelector } from "../hooks/redux";

import { RemoveItemFromWishlist } from "../actions/wishlist/RemoveItemFromWishlist";

import { formatToSupabaseImageUrl } from "../lib/supabase";

import { formatToCurrency } from "../utils/helpers";

import StarRatingWithEmpty from "./ui/StarRatingWithEmpty";

import { FaRegTrashAlt } from "react-icons/fa";

interface MiniWishlistProps {
  setIsMiniWishlistOpen: (isOpen: boolean) => void;
}

export default function MiniWishlist({
  setIsMiniWishlistOpen,
}: MiniWishlistProps) {
  //Router function
  const router = useRouter();

  //Wishlist items from redux state
  const wishlistItems = useAppSelector(
    (state: ReduxStoreState) => state.wishlist.items
  );

  //Number of items in the wishlist
  const wishlistItemsCount = wishlistItems.length;

  function handleViewWishlist() {
    //Close mini wishlist
    setIsMiniWishlistOpen(false);

    //Navigate to wishlist page
    router.push("/wishlist");
  }

  return (
    <div className="absolute top-[calc(100%_+_6px)] -right-3 w-[300px] py-4 bg-white shadow-md border-[2px] border-gray-50 text-black">
      {/** Item count */}
      <p className="text-[15px] px-3">
        You have {wishlistItemsCount}{" "}
        {wishlistItemsCount > 1 ? "items" : "item"} in your cart
      </p>

      {/** Wishlist items */}
      {/** Displays only the first four */}
      <main className="mt-2 px-3">
        {wishlistItems.slice(0, 4).map((item, index) => {
          //Supabase url for the product image
          const itemImageUrl = formatToSupabaseImageUrl(
            "productImages",
            item.image
          );

          //Item average rating
          const itemAverageRating = item.averageRating;

          //Item's price , item's discount and effective price
          const itemDiscount = item.discount;
          const itemPrice = item.price;
          const effectivePrice =
            itemDiscount > 0 ? itemPrice - itemDiscount : itemPrice;

          //Function to handle product deletion
          const removeItemFromWishlist = RemoveItemFromWishlist(item.id);

          function handleRemoveItem() {
            removeItemFromWishlist();
          }

          return (
            <div
              className="w-full grid grid-cols-[40px_auto_16px] items-center gap-3 py-3 border-b-[1px] border-gray-100"
              key={index}
            >
              {/** Item image */}
              <div className="relative w-[40px] h-[40px] overflow-hidden">
                <Image
                  src={itemImageUrl}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/** Item details */}
              <div className="space-y-2">
                {/** Title */}
                <p className="w-full line-clamp-1 text-ellipsis overflow-hidden text-[15px] leading-[15px]">
                  {item.title}
                </p>

                {/*** Star rating */}
                <p className="flex items-center gap-x-2">
                  {Boolean(itemAverageRating) && (
                    <StarRatingWithEmpty
                      rating={Number(itemAverageRating)}
                      starStyles="!text-base md:!text-base"
                    />
                  )}
                  <span className="text-[14px] leading-[14px] text-gray-400">
                    ({itemAverageRating})
                  </span>
                </p>

                {/** Prices */}
                <p className="space-x-2">
                  {/** Effective Price */}
                  <span className="font-semibold text-[14px] leading-[14px]">
                    <span className="font-roboto text-[14px] leading-[14px]">
                      ₦
                    </span>
                    {formatToCurrency(effectivePrice)}
                  </span>

                  {/** Previous price before discount  */}
                  {itemDiscount > 0 && (
                    <span className="font-semibold text-[14px] leading-[14px] line-through text-gray-400">
                      <span className="font-roboto text-[14px] leading-[14px]">
                        ₦
                      </span>
                      {formatToCurrency(itemPrice)}
                    </span>
                  )}
                </p>
              </div>

              {/** Delete icon */}
              <div className="w-[30px] h-full flex">
                <FaRegTrashAlt
                  className="mt-auto text-errorRed text-[16px]"
                  onClick={handleRemoveItem}
                />
              </div>
            </div>
          );
        })}
      </main>

      {/** Buttons */}
      <section className="px-3 mt-2 space-y-2">
        {/** Go to wishlist button */}
        <button
          className="w-full h-max px-3 py-2 text-white border-[2px] border-black bg-black items-center justify-center rounded-[7px] z-10 text-[15px]"
          onClick={handleViewWishlist}
        >
          Go to Wishlist
        </button>
      </section>
    </div>
  );
}
