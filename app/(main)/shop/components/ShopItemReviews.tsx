import { useEffect, useState } from "react";

import Image from "next/image";

import { ReduxStoreState } from "@/app/redux/store";

import { useAppSelector } from "@/app/hooks/redux";

import {
  ItemReview as ItemReviewModel,
  ShopItem as ShopItemModel,
} from "@/app/models/shop";

import { formatDate, shuffleArray } from "@/app/utils/helpers";

import StarRating from "@/app/components/ui/StarRating";

import AddYourReviewForm from "./AddYourReviewForm";

import reviewAvatar1 from "@/public/reviewAvatar1.jpeg";
import reviewAvatar2 from "@/public/reviewAvatar2.jpeg";
import reviewAvatar3 from "@/public/reviewAvatar3.jpeg";

interface ShopItemReviewsProps {
  shopItem: ShopItemModel;
  setItemAverageRating: React.Dispatch<React.SetStateAction<number>>;
  setNumberOfItemReviews: React.Dispatch<React.SetStateAction<number>>;
}

export default function ShopItemReviews({
  shopItem,
  setItemAverageRating,
  setNumberOfItemReviews,
}: ShopItemReviewsProps) {
  //Useful Shop item key-values
  const itemId = shopItem?.id;
  const itemAvgRating = shopItem?.averageRating;

  //Static reviews on every shop item page
  const staticReviews: ItemReviewModel[] = shuffleArray([
    {
      itemId: itemId,
      userId: "0x1",
      avatar: reviewAvatar1,
      name: "Alexa Johnson",
      rating: itemAvgRating,
      title: "Excellent quality and value",
      description:
        "I was pleasantly surprised by how well this product performed. The build quality is exceptional, and it feels like it was made to last.",
      createdAt: new Date(2024, 12, 6).toISOString(),
    },
    {
      itemId: itemId,
      userId: "0x2",
      avatar: reviewAvatar2,
      name: "Natasha Styles",
      rating: itemAvgRating,
      title: "Good, but there’s room for improvement",
      description:
        "The product works as advertised and has some really great features, but there are a few areas where it could be better.",
      createdAt: new Date(2024, 9, 21).toISOString(),
    },
    {
      itemId: itemId,
      userId: "0x3",
      avatar: reviewAvatar3,
      name: "Mark Williams",
      rating: itemAvgRating,
      title: "What I expected",
      description:
        "Nice product but I’ll likely look for alternatives next time.",
      createdAt: new Date(2024, 10, 12).toISOString(),
    },
  ]);

  //Reviews from redux state
  const dynamicReviews = useAppSelector(
    (state: ReduxStoreState) => state.shop.reviews
  );

  console.log(dynamicReviews);

  //Dynamic reviews for item
  const dynamicReviewsForItem: ItemReviewModel[] | null =
    dynamicReviews.length > 0
      ? dynamicReviews.filter((review) => review.itemId === itemId)
      : null;

  //All reviews
  const [allReviews, setAllReviews] =
    useState<ItemReviewModel[]>(staticReviews);

  //Set all Reviews if there are dynamic reviews for the item
  useEffect(() => {
    if (
      Array.isArray(dynamicReviewsForItem) &&
      dynamicReviews &&
      dynamicReviewsForItem.length > 0
    ) {
      setAllReviews([...staticReviews, ...dynamicReviewsForItem]);
    }
  }, [setAllReviews]);

  //Set item average rating and number of reviews
  useEffect(() => {
    const calculateAverageRating = (reviews: ItemReviewModel[]) => {
      if (!Array.isArray(reviews) || reviews.length === 0) {
        return 0; // Return 0 if no reviews
      }
      const totalRating = reviews.reduce(
        (sum, review) => sum + (review.rating || 0),
        0
      );
      return (totalRating / reviews.length).toFixed(1);
    };

    const averageRating = calculateAverageRating(allReviews);

    setItemAverageRating(Number(averageRating));
    setNumberOfItemReviews(Number(allReviews.length));
  }, [allReviews, setItemAverageRating, setNumberOfItemReviews]);

  //Check if item has been purchased and delivered to user
  const isItemDeliveredToUser = false;

  //Check if user has already reviewed the product
  const hasUserReviewedItem = false;

  return (
    <div className="w-full text-black space-y-3">
      {/** Header */}
      <h5 className="font-medium text-[17px] md:text-[19px]">
        Customer Reviews
      </h5>

      {/** All Customers' Reviews */}
      <main className="w-full">
        {allReviews.map((review, index) => {
          return (
            <div
              className="space-y-2 py-3 border-b-[1.5px] border-gray-200"
              key={index}
            >
              {/*** Customer avatar, name and rating */}
              <section className="grid grid-cols-[45px_auto] gap-3 items-center">
                <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden">
                  <Image src={review.avatar} alt={review.description} fill />
                </div>

                <div className="w-full space-y-1">
                  <p className="w-full text-[15px] md:text-[17px]">
                    {review.name}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
              </section>

              {/** Title */}
              <h6 className="font-medium text-base md:text-lg">
                {review.title}
              </h6>

              {/** Description */}
              <p className="text-[15px] md:text-[17px]">{review.description}</p>

              {/** Date of creation */}
              <section className="text-[15px] md:text-[17px]">
                <span className="text-gray-400">Posted on</span>
                <time className="ml-2">{formatDate(review.createdAt)}</time>
              </section>
            </div>
          );
        })}
      </main>

      {/** Add a review form */}
      {
        //Only displays when user has purchased and has the item delivered
      }
      {(!hasUserReviewedItem || !isItemDeliveredToUser) && (
        <AddYourReviewForm itemId={itemId} />
      )}
    </div>
  );
}
