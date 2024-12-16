import Image from "next/image";

import starRatingIcon from "@/public/ratingStar.svg";

export default function RenderStars(rating: number) {
  return Array(rating)
    .fill(0)
    .map((_, index) => (
      <Image
        key={index}
        src={starRatingIcon}
        alt="star rating icon"
        className="w-4"
      />
    ));
}
