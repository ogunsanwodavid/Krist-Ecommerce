import StarRating from "@/app/components/ui/StarRating";
import { ShopItem as ShopItemModel } from "@/app/models/shop";
import { shuffleArray } from "@/app/utils/helpers";

import reviewAvatar1 from "@/public/reviewAvatar1.jpeg";
import reviewAvatar2 from "@/public/reviewAvatar2.jpeg";
import reviewAvatar3 from "@/public/reviewAvatar3.jpeg";
import Image from "next/image";

export default function ShopItemReviews({
  shopItem,
}: {
  shopItem: ShopItemModel;
}) {
  //Useful Shop item key-values
  const itemAvgRating = shopItem?.averageRating;

  //Static reviews on every shop item page
  const staticReviews = shuffleArray([
    {
      avatar: reviewAvatar1,
      name: "Alexa Johnson",
      rating: itemAvgRating,
      title: "Excellent quality and value",
      description:
        "I was pleasantly surprised by how well this product performed. The build quality is exceptional, and it feels like it was made to last.",
      createdAt: new Date(2024, 12, 6),
    },
    {
      avatar: reviewAvatar2,
      name: "Natasha Styles",
      rating: itemAvgRating,
      title: "Good, but there’s room for improvement",
      description:
        "The product works as advertised and has some really great features, but there are a few areas where it could be better.",
      createdAt: new Date(2024, 9, 21),
    },
    {
      avatar: reviewAvatar3,
      name: "Mark Williams",
      rating: itemAvgRating,
      title: "What I expected",
      description:
        "Nice product but I’ll likely look for alternatives next time.",
      createdAt: new Date(2024, 10, 12),
    },
  ]);
  return (
    <div className="w-full text-black space-y-3">
      <h5 className="font-medium text-[17px] md:text-[19px]">
        Customer Reviews
      </h5>

      <main className="w-full">
        <div className="space-y-2">
          {/*** Customer avatar, name and rating */}
          <section className="grid grid-cols-[45px_auto] gap-3 items-center">
            <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden">
              <Image src={reviewAvatar1} alt={"a"} fill />
            </div>

            <div className="w-full space-y-1">
              <p className="w-full text-[15px] md:text-[17px]">Oguns David</p>
              <StarRating rating={4} />
            </div>
          </section>

          {/** Title */}
          <h6 className="font-medium text-base md:text-lg">
            Excellent quality and value
          </h6>

          {/** Description */}
          <p className="text-[15px] md:text-[17px]">
            I was pleasantly surprised by how well this product performed. The
            build quality is exceptional, and it feels like it was made to last.
          </p>

          {/** Date of creation */}
          <section className="text-[15px] md:text-[17px]">
            <span className="text-gray-400">Posted on</span>
            <time>{new Date().getMonth()}</time>
          </section>
        </div>
      </main>
    </div>
  );
}
