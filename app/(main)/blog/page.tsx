"use client";

import Image from "next/image";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import useFetchBlogPosts from "@/app/actions/blog/useFetchBlogPosts";

import { CircularProgress } from "@mui/material";

import FirstBlogPost from "./components/FirstBlogPost";

import noBlogPostImg from "@/public/noBlogPost.svg";

export default function Blog() {
  //Fetch blog posts
  const { isLoading: isFetchingBlogPosts } = useFetchBlogPosts();

  //Blog posts from redux state
  const blogPosts = useAppSelector(
    (state: ReduxStoreState) => state.blog.blogPosts
  );

  //Destructure the first item and the rest of the items
  const [firstPost, ...otherPosts] = blogPosts;

  console.log(otherPosts);

  //Show loading spinner if fetching blog posts
  if (isFetchingBlogPosts)
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
        <CircularProgress color="inherit" size={40} />
      </div>
    );

  //Show error if there's no blog post
  if (!blogPosts.length)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5 py-3 text-black lg:py-6">
        <Image
          src={noBlogPostImg}
          className="w-full max-w-[180px] md:max-w-[270px]"
          alt="Failed to load error image"
        />
        <p className="text-base text-center md:text-lg">
          Failed to load blog posts.
        </p>
      </div>
    );

  return (
    <div className="space-y-7">
      {/** First post */}
      <FirstBlogPost firstPost={firstPost} />
    </div>
  );
}
