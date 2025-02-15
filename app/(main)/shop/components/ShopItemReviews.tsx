import { useEffect, useState } from "react";

import Image from "next/image";

import { ReduxStoreState } from "@/app/redux/store";

import { useAppSelector } from "@/app/hooks/redux";

import {
  ItemReview as ItemReviewModel,
  ShopItem as ShopItemModel,
} from "@/app/models/shop";

import { Order as OrderModel } from "@/app/models/orders";

import { useAuth } from "@/contexts/AuthContext";

import { formatDate, shuffleArray } from "@/app/utils/helpers";

import StarRating from "@/app/components/ui/StarRating";

import AddYourReviewForm from "./AddYourReviewForm";

import { FaUserCircle } from "react-icons/fa";

import reviewAvatar1 from "@/public/reviewAvatar1.jpeg";
import reviewAvatar2 from "@/public/reviewAvatar2.jpeg";
import reviewAvatar3 from "@/public/reviewAvatar3.jpeg";
import { isAfter, parseISO } from "date-fns";

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
  //Variable from auth context
  const { user, isAuthenticated } = useAuth();

  //User credentials
  const userId = user?.id;

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

  // State to hold dynamic reviews for the specific item
  const [dynamicReviewsForItem, setDynamicReviewsForItem] = useState<
    ItemReviewModel[]
  >([]);

  //Set dynamic reviews for the item
  useEffect(() => {
    if (dynamicReviews.length > 0) {
      setDynamicReviewsForItem(
        dynamicReviews.filter((review) => review.itemId === itemId)
      );
    } else {
      setDynamicReviewsForItem([]);
    }
  }, [dynamicReviews, itemId]);

  //All reviews
  const [allReviews, setAllReviews] =
    useState<ItemReviewModel[]>(staticReviews);

  //Set all Reviews if there are dynamic reviews for the item
  useEffect(() => {
    if (Array.isArray(dynamicReviewsForItem)) {
      setAllReviews([...staticReviews, ...dynamicReviewsForItem]);
    }
  }, [setAllReviews, dynamicReviewsForItem]);

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

  //Orders from the redux state
  const orders: OrderModel[] = useAppSelector(
    (state: ReduxStoreState) => state.orders.orders
  );

  //Order for item
  const itemOrder =
    orders[orders.findIndex((order) => order.product.item.id === itemId)];

  //Function check delivery status
  function checkIfDelivered(deliveryDateISO: string): boolean {
    // Convert ISO string to Date object
    const deliveryDate = parseISO(deliveryDateISO);

    // Get the current date and time
    const currentDate = new Date();

    // Check if the current date is after the delivery date
    return isAfter(currentDate, deliveryDate);
  }

  //Check if item has been purchased / ordered and delivered to user
  const isItemDeliveredToUser =
    orders.some((order) => order.product.item.id === itemId) &&
    checkIfDelivered(itemOrder.deliveryDate);

  //Check if user has already reviewed the product
  const hasUserReviewedItem =
    Array.isArray(dynamicReviewsForItem) &&
    dynamicReviews &&
    dynamicReviewsForItem.length > 0 &&
    dynamicReviews.some((review) => review.userId === userId);

  // State to track form submission and trigger remount
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <div className="w-full text-black space-y-3">
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
                {review.avatar ? (
                  <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden lg:w-[50px] lg:h-[50px]">
                    <Image src={review.avatar} alt={review.description} fill />
                  </div>
                ) : (
                  <FaUserCircle className="w-[45px] h-[45px] lg:w-[50px] lg:h-[50px]" />
                )}

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
        //Only displays when user is authenticated, item has been purchased and delivered to user and user has not reviewed item
      }
      {isAuthenticated && !hasUserReviewedItem && isItemDeliveredToUser && (
        <AddYourReviewForm
          itemId={itemId}
          key={isFormSubmitted ? "remount" : "original"}
          setIsFormSubmitted={setIsFormSubmitted}
        />
      )}
    </div>
  );
}
