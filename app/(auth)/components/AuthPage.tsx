import React from "react";

import Image, { StaticImageData } from "next/image";

import darkLogo from "@/public/dark-logo.svg";

interface AuthPageProps {
  imageUrl: StaticImageData;
  children: React.ReactNode;
}

export default function AuthPage({ imageUrl, children }: AuthPageProps) {
  return (
    <div className="w-full min-h-screen flex bg-white">
      {/****** Image section */}
      <section className="hidden w-[800px] min-h-full lg:block">
        <Image
          src={imageUrl}
          className="w-full h-screen object-top object-cover"
          alt="login image, someone wearing designer clothes"
        />
      </section>

      {/**** Main section */}
      <main className="w-full min-h-full flex justify-center items=center p-3 lg:justify-start lg:p-[30px]">
        <section className="w-full max-w-[450px] flex flex-col gap-y-3 justify-center items-center lg:items-start">
          {/*** Logo */}
          <Image
            src={darkLogo}
            className="h-8 md:h-9 lg:absolute lg:left-[40px] lg:top-[40px]"
            alt="dark Krist logo"
          />

          {/**** Children is rendered here */}
          {children}
        </section>
      </main>
    </div>
  );
}
