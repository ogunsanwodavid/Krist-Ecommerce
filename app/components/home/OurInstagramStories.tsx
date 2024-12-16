import InstgramImg1 from "@/public/instagram-1.jpg";
import InstgramImg2 from "@/public/instagram-2.jpg";
import InstgramImg3 from "@/public/instagram-3.jpg";
import InstgramImg4 from "@/public/instagram-4.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";

export default function OurInstagramStories() {
  const instagramPosts = [
    { image: InstgramImg1, link: "https://www.instagram.com/00xdave/" },
    { image: InstgramImg2, link: "https://www.instagram.com/00xdave/" },
    { image: InstgramImg3, link: "https://www.instagram.com/00xdave/" },
    { image: InstgramImg4, link: "https://www.instagram.com/00xdave/" },
  ];
  return (
    <div className="w-full">
      {/**** Inner container */}
      <div className="w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-6 md:py-20 md:space-y-7 lg:px-0">
        {/*** Header */}
        <header className="w-full flex items-center justify-center">
          <h2 className="text-black text-[23px] text-center md:text-3xl">
            Our Instagram Stories
          </h2>
        </header>

        {/*** Instagram posts */}
        <main className="flex justify-center flex-wrap gap-[30px] gap-y-[50px]">
          {instagramPosts.map((post, index) => {
            return (
              <div className="w-full max-w-[277.5px] group" key={index}>
                <Link
                  href={post.link}
                  className="relative w-full h-[320px] flex flex-col overflow-hidden"
                >
                  {/*** Post image */}
                  <Image
                    src={post.image}
                    className="w-full h-full object-cover"
                    alt="00xdave instagram post"
                    fill
                  />

                  {/*** Instagram icon */}
                  <section className="absolute left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.3)] flex items-center justify-center duration-300 ease-linear group-hover:!opacity-100 lg:opacity-0">
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                      <FaInstagram className="text-2xl text-black" />
                    </div>
                  </section>
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
