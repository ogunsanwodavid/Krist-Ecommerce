"use client";

import Image from "next/image";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import useFetchBlogPosts from "@/app/actions/blog/useFetchBlogPosts";

import { CircularProgress } from "@mui/material";

import FirstBlogPost from "./components/FirstBlogPost";
import BlogPost from "./components/BlogPost";

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

  //Site URL
  const siteUrl =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";

  console.log(siteUrl);

  return (
    <div className="pb-12 lg:pb-16">
      {/** First post */}
      <FirstBlogPost firstPost={firstPost} />

      {/** Other posts */}
      <main className="space-y-5 mt-7 lg:mt-12">
        {/** Heading */}
        <h4 className="w-max mx-auto text-2xl lg:mx-0 lg:text-[28px]">
          Latest Posts
        </h4>

        {/** Blogs list */}
        <section className="flex justify-center flex-wrap gap-[30px] gap-y-[50px]">
          {otherPosts.map((post) => (
            <BlogPost blogPost={post} key={post.id} />
          ))}
        </section>
      </main>
    </div>
  );
}
