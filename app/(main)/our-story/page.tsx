import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import MainButton from "@/app/components/ui/MainButton";

import aboutImg1 from "@/public/about-1.jpg";
import aboutImg2 from "@/public/about-2.jpg";
import aboutImg3 from "@/public/about-3.jpg";
import aboutImg4 from "@/public/about-4.jpg";

import aboutHeroBgPattern from "@/public/about-hero-bg.png";

import aboutGlobalOffices from "@/public/about-global-offices.svg";
import aboutEmployees from "@/public/about-employees.svg";
import aboutCustomers from "@/public/about-customers.svg";

export default function OurStory() {
  //Krist by numbers items model
  interface KristByNumbersItem {
    title: string;
    image: StaticImageData | string;
    number: number;
  }

  //Krist by numbers items
  const KristByNumbers: KristByNumbersItem[] = [
    {
      title: "global offices",
      image: aboutGlobalOffices,
      number: 11,
    },
    {
      title: "employees",
      image: aboutEmployees,
      number: 8000,
    },
    {
      title: "customers",
      image: aboutCustomers,
      number: 65000,
    },
  ];

  return (
    <div>
      {/** Hero */}
      <section className="relative bg-[#f6f9fc] px-3 py-14 md:px-6 md:pr-0 lg:px-0 lg:py-18 overflow-hidden">
        {/** Inner container */}
        <main className="relative mx-auto space-y-7 z-10 md:space-y-0 md:flex md:items-center md:gap-x-[80px] lg:max-w-[1200px] lg:gap-x-[130px]">
          {/** Texts */}
          <div className="space-y-4 text-black lg:space-y-7">
            <h2 className="text-3xl font-semibold md:text-[38px] lg:text-[44px]">
              About Us
            </h2>
            <p className="text-xl font-light md:text-[22px]">
              At Krist, our clothing and brand culture are designed with
              intention, not by chance. Just like our products, everything we do
              is meticulously crafted to provide a seamless and delightful
              shopping experience.
            </p>
          </div>

          {/** Image */}
          <Image
            src={aboutImg1}
            className="w-full md:shrink-0 md:w-[400px] lg:w-[450px]"
            alt="About Krist"
            width={1060}
            height={706}
          />
        </main>

        {/** Background pattern */}
        <Image
          src={aboutHeroBgPattern}
          className="hidden absolute w-[45%] right-0 bottom-0 translate-x-[30%] translate-y-[65%] lg:block"
          alt="Krist about hero bg pattern"
          width={707}
          height={943}
        />
      </section>

      {/** Our Mission */}
      <section className="relative px-3 pt-14 pb-9 md:px-6 md:pl-0 lg:px-0 lg:pt-18 lg:pb-10 overflow-hidden">
        {/** Inner container */}
        <main className="relative mx-auto space-y-4 z-10 md:space-y-0 md:flex md:items-center md:gap-x-[30px] lg:max-w-[1200px] lg:gap-x-[50px]">
          {/** Image */}
          <Image
            src={aboutImg2}
            className="w-full md:shrink-0 md:w-[400px] lg:w-[480px]"
            alt="About Krist"
            width={1060}
            height={706}
          />

          {/** Texts */}
          <div className="space-y-3 text-black lg:space-y-5">
            <h3 className="text-[22px] font-semibold md:text-[26px] lg:text-[33px]">
              Our Mission: Empowering Your Style, Elevating Your Business
            </h3>
            <p className="text-lg font-light md:text-[20px]">
              At Krist, we don&apos;t just focus on growing — we focus on
              growing better. We believe that true growth comes from aligning
              our success with the satisfaction and success of our customers. We
              provide high-quality, stylish clothing and help you express
              yourself..
            </p>
          </div>
        </main>
      </section>

      {/** Our Story */}
      <section className="relative px-3 pt-14 pb-9 md:px-6 md:pr-0 lg:px-0 lg:py-18 lg:pb-10 overflow-hidden">
        {/** Inner container */}
        <main className="relative mx-auto space-y-4 z-10 md:space-y-0 md:flex md:flex-row-reverse md:items-center md:gap-x-[30px] lg:max-w-[1200px] lg:gap-x-[50px]">
          {/** Image */}
          <Image
            src={aboutImg3}
            className="w-full md:shrink-0 md:w-[400px] lg:w-[480px]"
            alt="About Krist"
            width={1060}
            height={706}
          />

          {/** Texts */}
          <div className="space-y-3 text-black lg:space-y-5">
            <h3 className="text-[22px] font-semibold md:text-[26px] lg:text-[33px]">
              Our Story
            </h3>
            <div className="space-y-2 text-lg font-light md:text-[20px]">
              <p>
                Krist was born in 2010 when Dave, a designer with an eye for
                detail, and Sarah, a passionate entrepreneur, found themselves
                dreaming of a world where clothing wasn&apos;t just fabric but a
                means of self-expression.
              </p>
              <p>
                What began as a small boutique in a quiet corner of New York
                quickly blossomed into a beloved clothing line, Krist has become
                more than a fashion brand—it&apos;s a lifestyle.
              </p>
              <p>
                Today, Krist is proud to dress confident and vibrant people
                across the globe. Guided by Dave&apos;s creative vision and our
                commitment to sustainability, Krist continues to evolve while
                staying true to its roots: timeless fashion for the modern soul.
              </p>
            </div>
          </div>
        </main>
      </section>

      {/** Krist By Numbers */}
      <section className="relative bg-[#f6f9fc] px-3 py-14 md:px-6 md:pr-0 lg:px-0 lg:py-18 overflow-hidden">
        {/** Inner container */}
        <div className="relative mx-auto space-y-7 lg:max-w-[1200px] lg:gap-x-[130px]">
          {/** Heading */}
          <h3 className="w-max mx-auto text-[22px] font-semibold md:text-[26px] lg:text-[33px]">
            Krist By the Numbers
          </h3>

          {/** Content */}
          <main className="flex flex-wrap items-center justify-center gap-[50px]">
            {KristByNumbers.map((item, index) => {
              return (
                <div
                  className="w-full max-w-[366.67px] bg-white p-4 flex flex-col items-center gap-y-3 rounded-lg lg:p-6 lg:gap-y-4"
                  key={index}
                >
                  {/** Image */}
                  <Image
                    src={item.image}
                    className="w-full max-h-[128px]"
                    alt="Krist"
                    width={128}
                    height={128}
                  />

                  {/** Number && Title */}
                  <h5 className="text-[21px] font-semibold capitalize md:text-[25px]">
                    {item.number}
                    {item.number > 500 && "+"} {item.title}
                  </h5>

                  {/** Learn more */}
                  <Link
                    href="#"
                    className="w-max text-blue-500 text-lg font-medium underline md:text-[21px]"
                  >
                    Learn more
                  </Link>
                </div>
              );
            })}
          </main>
        </div>
      </section>

      <section className="relative px-3 pt-14 pb-9 md:px-6 md:pr-0 lg:px-0 lg:py-18 lg:pb-10 overflow-hidden">
        {/** Inner container */}
        <main className="relative mx-auto space-y-4 z-10 md:space-y-0 md:flex md:flex-row-reverse md:items-center md:gap-x-[30px] lg:max-w-[1200px] lg:gap-x-[50px]">
          {/** Image */}
          <Image
            src={aboutImg4}
            className="w-full md:shrink-0 md:w-1/2"
            alt="About Krist"
            width={1060}
            height={706}
          />

          {/** Texts */}
          <div className="p-5">
            {/** Inner */}
            <main className="w-full max-w-[550px] mx-auto space-y-2 text-black">
              <h3 className="text-[19px] font-semibold md:text-[22px] lg:text-[26px]">
                It&apos;s Your Time to Shine
              </h3>
              <h4 className="text-[24px] font-semibold md:text-[28px] lg:text-[32px]">
                Discover fashion that empowers you.
              </h4>
              <p className="text-lg font-light md:text-[20px]">
                Elevate your wardrobe and embrace your best self with Krist.
                Whether it&apos;s style, comfort, or confidence you&apos;re
                after, our expertly crafted pieces are designed to help you
                stand out and feel amazing every day.
              </p>
              <Link href="/shop" className="block !mt-4">
                <MainButton className="!font-semibold !px-8 !py-3 lg:!px-12 lg:!py-6">
                  Get Started
                </MainButton>
              </Link>
            </main>
          </div>
        </main>
      </section>
    </div>
  );
}
