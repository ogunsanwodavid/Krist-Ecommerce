import Link from "next/link";
import Image from "next/image";

import { BlogPost as BlogPostModel } from "@/app/models/blog";

import { formatDate } from "@/app/utils/helpers";

import { FaEye } from "react-icons/fa";

import { HiThumbUp } from "react-icons/hi";

interface BlogPostProps {
  blogPost: BlogPostModel;
}

export default function BlogPost({ blogPost }: BlogPostProps) {
  //Blog post id
  const blogPostId = blogPost.id;

  return (
    <Link
      href={`/blog/${blogPostId}`}
      className="block w-full max-w-[313.333px] space-y-4 shadow-xl p-4 rounded-xl md:rounded-2xl"
    >
      {/** Thumbnail */}
      <Image
        src={blogPost.thumbnail}
        className="w-full h-[200px] object-cover object-center rounded-t-lg md:rounded-t-xl"
        alt={blogPost.title}
        width="1000"
        height="550"
      />

      {/** Texts */}
      <section className="space-y-2">
        {/** Category */}
        <div className="w-max bg-[rgb(75,107,251,0.1)] text-blue-primary rounded-[5px] px-2 py-1">
          <span className="text-[13px] leading-[13px]">
            {blogPost.category}
          </span>
        </div>

        {/** Title */}
        <p className="text-black text-lg font-medium line-clamp-2 overflow-hidden text-ellipsis">
          {blogPost.title}
        </p>

        {/** Content snippet */}
        <p className="text-black text-[16px] line-clamp-1 overflow-hidden text-ellipsis">
          {blogPost.content[0]?.content}
        </p>

        <div className="flex justify-between items-center text-gray-500 !mt-3">
          {/** Date of creation */}
          <p className="text-[15px]">{formatDate(blogPost.createdAt)}</p>

          {/** Likes and views count */}
          <section className="flex gap-x-3">
            <div className="flex gap-x-1 items-center">
              <HiThumbUp className="text-[16px]" />

              <span className="text-[13px] leading-[13px]">
                {blogPost.likes}
              </span>
            </div>

            <p className="flex gap-x-1 items-center md:gap-x-2">
              <FaEye className="text-[16px]" />

              <span className="text-[14px] leading-[14px]">
                {blogPost.views}
              </span>
            </p>
          </section>
        </div>
      </section>
    </Link>
  );
}
