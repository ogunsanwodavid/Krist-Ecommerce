import Link from "next/link";
import Image from "next/image";

import MainButton from "./components/ui/MainButton";

import pageNotFoundImg from "@/public/page-not-found.svg";

export default function PageNotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 py-9 text-black lg:py-12">
      <Image
        src={pageNotFoundImg}
        className="w-full max-w-[200px] md:max-w-[400px]"
        alt="auth error image"
      />
      <p className="text-base text-center md:text-lg">
        The page you requested could not be found.
      </p>

      {/** Buttons */}
      <section className="flex items-center justify-center flex-wrap gap-2">
        {/** Back To Home */}
        <Link href={"/"}>
          <MainButton className="border-[1.5px] border-black !px-4 lg:!px-9">
            Back To Home
          </MainButton>
        </Link>
      </section>
    </div>
  );
}
