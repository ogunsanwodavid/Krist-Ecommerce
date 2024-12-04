"use client";

import { useRouter } from "next/navigation";

import AuthPage from "../components/AuthPage";

import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

import forgotPasswordImage from "@/public/forgotpassword.png";

import { BsChevronLeft } from "react-icons/bs";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <AuthPage imageUrl={forgotPasswordImage}>
      {/**** Back button */}
      <section
        onClick={() => router.back()}
        className="self-start w-max flex items-center gap-x-1 cursor-pointer"
      >
        <BsChevronLeft className="text-black text-base md:text-lg" />
        <p className="hidden text-black text-[14px] md:text-base lg:block">
          Back
        </p>
      </section>

      {/*** Headings */}
      <div className="flex flex-col items-center gap-y-0 lg:items-start">
        <h2 className="font-semibold text-2xl text-center md:text-[26px] ">
          Forgot Password
        </h2>
        <h3 className="font-regular text-grey text-center opacity-60 text-base md:text-[18px] lg:text-left">
          Enter your registered email address. we&apos;ll send you a code to
          reset your password.
        </h3>
      </div>

      {/**** Form */}
      <form className="w-full flex flex-col gap-y-4" action="">
        {/***** Email address input */}
        <FormInput label="Email Address" error="">
          <input
            type="text"
            autoComplete="off"
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey `}
          />
        </FormInput>

        <FormButton>Send OTP</FormButton>
      </form>
    </AuthPage>
  );
}
