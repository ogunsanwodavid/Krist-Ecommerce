import HeroSection from "./components/home/HeroSection";
import ShopByCategories from "./components/home/ShopByCategories";

export default function Home() {
  return (
    <div>
      {/*** Hero Section */}
      <HeroSection />

      {/*** Shop By Categories */}
      <ShopByCategories />
    </div>
  );
}
