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
  image: string;
  inStock: boolean;
  numberOfReviews: number;
  price: number;
  sizesAvailable: string[];
}