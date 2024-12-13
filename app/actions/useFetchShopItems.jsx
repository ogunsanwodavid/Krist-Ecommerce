import { useQuery } from "@tanstack/react-query";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import fetchShopItems from "../api/fetchShopItems";

import { setItems } from "../redux/shopSlice";

export default function useFetchShopItems() {
  const dispatch = useDispatch();

  const { isLoading } = useQuery({
    queryKey: ["shopItems"],
    queryFn: fetchShopItems,
    onSuccess: (data) => {
      // Dispatch action to set items in Redux state
      dispatch(setItems(data));
    },
    onError: (error) => {
      // Optionally handle error state here
      toast.error(error.message || "Failed to fetch shop items");
    },
  });

  return { isLoading }; // No UI rendering needed
}
