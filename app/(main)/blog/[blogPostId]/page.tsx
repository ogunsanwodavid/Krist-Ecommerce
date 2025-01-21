"use client";

import Image from "next/image";

import { useParams } from "next/navigation";

import { useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import useFetchCurrentBlogPost from "@/app/actions/blog/useFetchCurrentBlogPost";

import { formatDate } from "@/app/utils/helpers";

import { CircularProgress } from "@mui/material";

import { FaEye } from "react-icons/fa";

import { HiThumbUp } from "react-icons/hi";

import noBlogPostImg from "@/public/noBlogPost.svg";

export default function BlogPostPage() {
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

  return (
    <div className="max-w-[900px] mx-auto space-y-4 pb-4 lg:pb-8 md:space-y-6 ">
      {/** Header */}
      <header className="space-y-2 md:space-y-3">
        {/** Category */}
        <div className="w-max bg-blue-primary  text-white rounded-[5px] px-2 py-1">
          <span className="text-[14px] leading-[14px] md:text-[16px] md:leading-[16px]">
            {currentBlogPost.category}
          </span>
        </div>

        {/** Title */}
        <h2 className="text-black text-xl font-medium line-clamp-2 overflow-hidden text-ellipsis md:text-[26px] md:leading-[30px]">
          {currentBlogPost.title}
        </h2>

        <div className="flex items-center space-x-8 text-gray-500 md:space-x-16">
          {/** Date of creation */}
          <p className="text-[15px] md:text-[17px]">
            {formatDate(currentBlogPost.createdAt)}
          </p>

          {/** Likes and views count */}
          <section className="flex gap-x-3 md:gap-x-4">
            <div className="flex gap-x-1 items-center md:gap-x-2">
              <HiThumbUp className="text-[16px] md:text-[18px]" />

              <span className="text-[13px] leading-[13px] md:text-[15px] md:leading-[15px]">
                {currentBlogPost.likes}
              </span>
            </div>

            <p className="flex gap-x-1 items-center md:gap-x-2">
              <FaEye className="text-[16px] md:text-[18px]" />

              <span className="text-[13px] leading-[13px] md:text-[15px] md:leading-[15px]">
                {currentBlogPost.views}
              </span>
            </p>
          </section>
        </div>
      </header>

      {/** Thumbnail */}
      <Image
        src={currentBlogPost.thumbnail}
        className="w-full h-[250px] object-cover object-center rounded-xl md:rounded-2xl md:h-[430px]"
        alt={currentBlogPost.title}
        width="1000"
        height="550"
      />

      {/*
       *Main content
       *Render based on type of content
       */}
      <main className="space-y-4 md:space-y-6">
        {currentBlogPost.content.map(({ type, content }, index) => {
          if (type === "paragraph") {
            return (
              <p
                className="text-[#3B3C4A] text-[17px] !mt-1 md:text-[19px] md:!mt-2"
                key={index}
              >
                {content}
              </p>
            );
          } else if (type === "heading") {
            return (
              <h3
                className="text-black text-xl font-medium md:text-[22px]"
                key={index}
              >
                {content}
              </h3>
            );
          } else if (type === "image") {
            return (
              <Image
                src={content}
                className="w-full h-[250px] object-cover object-center rounded-xl md:rounded-2xl md:h-[430px]"
                alt={currentBlogPost.title}
                width="1000"
                height="550"
                key={index}
              />
            );
          } else if (type === "quote") {
            return (
              <div
                className="bg-[#F6F6F7] p-5 rounded-xl italic text-[#181A2A] text-xl flex items-center justify-center md:text-3xl md:rounded-2xl md:p-10"
                key={index}
              >
                <span className="text-center">&ldquo;{content}&rdquo;</span>
              </div>
            );
          }
        })}
      </main>
    </div>
  );
}
