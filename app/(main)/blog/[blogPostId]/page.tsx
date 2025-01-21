"use client";

import Image from "next/image";

import { useParams } from "next/navigation";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import useFetchCurrentBlogPost from "@/app/actions/blog/useFetchCurrentBlogPost";

import { CircularProgress } from "@mui/material";

import noBlogPostImg from "@/public/noBlogPost.svg";

export default function BlogPost() {
  //Route parameters
  const params = useParams();

  //Blog post id
  const blogPostId = params.blogPostId!;

  //Fetch current blog post
  const { isLoading: isFetchingBlogPost } = useFetchCurrentBlogPost(
    String(blogPostId)
  );

  //Current blog post from redux state
  const currentBlogPost = useAppSelector(
    (state: ReduxStoreState) => state.blog.currentBlogPost
  )!;

  //Show loading spinner if fetching shop items
  if (isFetchingBlogPost)
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
        <CircularProgress color="inherit" size={40} />
      </div>
    );

  //Show error if there's no blog post
  if (!currentBlogPost)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5 py-3 text-black lg:py-6">
        <Image
          src={noBlogPostImg}
          className="w-full max-w-[180px] md:max-w-[270px]"
          alt="Failed to load error image"
        />
        <p className="text-base text-center md:text-lg">
          Failed to load blog post.
        </p>
      </div>
    );

  return <div></div>;
}
