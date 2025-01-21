"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAppDispatch } from "../../hooks/redux";

import { setBlogPosts } from "../../redux/blogSlice";

import fetchBlogPosts from "../../api/blog/fetchBlogPosts";

export default function useFetchBlogPosts() {
  //Dispatch function
  const dispatch = useAppDispatch();

  //Load shop items using React Query
  const { isLoading, data } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
  });

  //Set data using Redux dispatch function when data has loaded
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setBlogPosts(data));
    }
  }, [isLoading, dispatch, data]);

  return { isLoading }; // No UI rendering needed
}
