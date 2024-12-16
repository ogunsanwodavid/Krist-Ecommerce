"use client";

import useFetchShopItems from "./actions/useFetchShopItems";
import BestSeller from "./components/home/BestSeller";
import DealsOfTheMonth from "./components/home/DealsOfTheMonth";
import HeroSection from "./components/home/HeroSection";
import OurInstagramStories from "./components/home/OurInstagramStories";
import OurServices from "./components/home/OurServices";
import ShopByCategories from "./components/home/ShopByCategories";
import WhatCustomersSay from "./components/home/WhatCustomersSay";

export default function Home() {
  //Fetch shop items
  const { isLoading: isFetchingShopItems } = useFetchShopItems();

  return (
    <div>
      {/*** Hero Section */}
      <HeroSection />

      {/*** Shop By Categories */}
      <ShopByCategories />

      {/*** Our BestSeller */}
      <BestSeller isFetchingShopItems={isFetchingShopItems} />

      {/*** Deals of the month */}
      <DealsOfTheMonth />

      {/*** What Customers say */}
      <WhatCustomersSay />

      {/*** Our Instagram Stories */}
      <OurInstagramStories />

      {/*** Our Services */}
      <OurServices />
    </div>
  );
}
