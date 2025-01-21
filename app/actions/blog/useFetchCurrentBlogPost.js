import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "../../hooks/redux";

import { setCurrentBlogPost } from "../../redux/blogSlice";

import fetchCurrentBlogPost from "../../api/blog/fetchCurrentBlogPost";

export default function useFetchCurrentBlogPost(id) {
  //Dispatch function
  const dispatch = useAppDispatch();

  //Load shop items using React Query
  const { isLoading, data } = useQuery({
    queryKey: ["currentBlogPost", id], // Include `id` in the query key
    queryFn: () => fetchCurrentBlogPost(id), // Pass a function reference
    enabled: !!id, // Ensure the query doesn't run if `id` is falsy
  });

  //Set data using Redux dispatch function when data has loaded
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setCurrentBlogPost(data));
    }
  }, [isLoading, dispatch, data]);

  return { isLoading }; // No UI rendering needed
}
