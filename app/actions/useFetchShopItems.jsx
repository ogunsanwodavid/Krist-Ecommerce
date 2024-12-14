import { useQuery } from "@tanstack/react-query";

//import { toast } from "react-toastify";

import fetchShopItems from "../api/fetchShopItems";

import { setItems } from "../redux/shopSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";

export default function useFetchShopItems() {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["shopItems"],
    queryFn: fetchShopItems,
    /* onSuccess: (data) => {
      // Dispatch action to set items in Redux state
      dispatch(setItems(data));
      console.log(data);
    },
    onError: (error) => {
      // Optionally handle error state here
      toast.error(error.message || "Failed to fetch shop items");
    }, */
  });

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setItems(data));
      console.log(data);
    }
  }, [isLoading, dispatch, data]);

  return { isLoading }; // No UI rendering needed
}
