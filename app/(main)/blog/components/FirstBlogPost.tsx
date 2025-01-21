import Link from "next/link";
import Image from "next/image";

import { BlogPost } from "@/app/models/blog";

import { formatDate } from "@/app/utils/helpers";

import { FaEye } from "react-icons/fa";

import { HiThumbUp } from "react-icons/hi";

interface FirstBlogPostProps {
  firstPost: BlogPost;
}

export default function FirstBlogPost({ firstPost }: FirstBlogPostProps) {
  return (
    <Link
      href={`/blog/${firstPost.id}`}
      className="block h-[350px] md:h-[460px] lg:h-[500px]"
    >
      <main className="relative">
        {/** Thumbnail */}
        <div className="w-full h-[290px] md:h-[400px] lg:h-[440px]">
          <Image
            src={firstPost.thumbnail}
            className="w-full h-full object-cover object-center rounded-xl md:rounded-2xl"
            alt={firstPost.title}
            width="1000"
            height="550"
          />
        </div>

        {/** Details */}
        <div className="absolute bottom-0 left-5 w-[calc(100%_-_40px)] max-h-[196px] max-w-[350px] translate-y-[20%] rounded-lg shadow-xl bg-white p-4 space-y-2 md:max-h-[227px] md:max-w-[450px] md:left-9 md:p-6 lg:space-y-[10px]">
          {/** Category */}
          <div className="w-max bg-blue-primary  text-white rounded-[5px] px-2 py-1">
            <span className="text-[13px] leading-[13px] md:text-[15px] md:leading-[15px]">
              {firstPost.category}
            </span>
          </div>

          {/** Title */}
          <p className="text-black text-xl font-medium line-clamp-2 overflow-hidden text-ellipsis md:text-[22px]">
            {firstPost.title}
          </p>

          {/** Content snippet */}
          <p className="text-black text-[17px] line-clamp-1 overflow-hidden text-ellipsis md:text-[19px]">
            {firstPost.content[0]?.content}
          </p>

          <div className="flex justify-between items-center  text-gray-500">
            {/** Date of creation */}
            <p className="text-[14px] md:text-[16px]">
              {formatDate(firstPost.createdAt)}
            </p>

            {/** Likes and views count */}
            <section className="flex gap-x-3 md:gap-x-4">
              <div className="flex gap-x-1 items-center md:gap-x-2">
                <HiThumbUp className="text-[16px] md:text-[18px]" />

                <span className="text-[13px] leading-[13px] md:text-[15px] md:leading-[15px]">
                  {firstPost.likes}
                </span>
              </div>

              <p className="flex gap-x-1 items-center md:gap-x-2">
                <FaEye className="text-[16px] md:text-[18px]" />

                <span className="text-[13px] leading-[13px] md:text-[15px] md:leading-[15px]">
                  {firstPost.views}
                </span>
              </p>
            </section>
          </div>
        </div>
      </main>
    </Link>
  );
}
