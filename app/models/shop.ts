import { StaticImageData } from "next/image";

export interface ShopItem {
  id: number;
  title: string;
  amountSold: number;
  averageRating: number;
  brand: string;
  category: string;
  colorsAvailable: string[];
  createdAt: string;
  description: string;
  discount: number;
  image: string;
  inStock: boolean;
  numberOfReviews: number;
  price: number;
  sizesAvailable: string[];
}

export interface ItemReview {
  itemId: number;
  userId: string;
  avatar: string | StaticImageData;
  name: string;
  rating: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface ShopState {
  items: ShopItem[];
  currentItem: ShopItem | null;
  reviews: ItemReview[];
}
