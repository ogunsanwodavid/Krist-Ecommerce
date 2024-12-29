import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "../../hooks/redux";

import { setCurrentItem } from "../../redux/shopSlice";

import fetchCurrentShopItem from "../../api/shop/fetchCurrentShopItem";

export default function useFetchCurrentShopItem(id) {
  //Dispatch function
  const dispatch = useAppDispatch();

  //Load shop items using React Query
  const { isLoading, data } = useQuery({
    queryKey: ["currentShopItem", id], // Include `id` in the query key
    queryFn: () => fetchCurrentShopItem(id), // Pass a function reference
    enabled: !!id, // Ensure the query doesn't run if `id` is falsy
  });

  //Set data using Redux dispatch function when data has loaded
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setCurrentItem(data));
    }
  }, [isLoading, dispatch, data]);

  return { isLoading }; // No UI rendering needed
}
