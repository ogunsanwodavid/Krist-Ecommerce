import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "../../hooks/redux";

import { setItems } from "../../redux/shopSlice";

import fetchShopItems from "../../api/shop/fetchShopItems";

export default function useFetchShopItems() {
  //Dispatch function
  const dispatch = useAppDispatch();

  //Load shop items using React Query
  const { isLoading, data } = useQuery({
    queryKey: ["shopItems"],
    queryFn: fetchShopItems,
  });

  //Set data using Redux dispatch function when data has loaded
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setItems(data));
    }
  }, [isLoading, dispatch, data]);

  return { isLoading }; // No UI rendering needed
}
