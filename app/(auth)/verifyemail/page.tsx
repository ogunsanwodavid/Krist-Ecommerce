"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import AuthPage from "../components/AuthPage";

import FormButton from "@/app/components/ui/FormButton";

import verifyEmailImage from "@/public/verifyemail.png";

import { BsChevronLeft } from "react-icons/bs";

export default function VerifyEmail() {
  const router = useRouter();

  //State of OTP
  const [otp, setOtp] = useState<string[]>(new Array(6).fill("")); // Initialize an array with 6 empty strings
  const otpString = otp.join("");
  console.log(otpString);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (!isNaN(Number(element.value))) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Focus the next input if it exists and is an HTMLInputElement
      const nextElement = element.nextSibling as HTMLInputElement | null;
      if (nextElement && element.value) {
        nextElement.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Check if the pressed key is "Backspace" and if the current OTP input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const target = e.target as HTMLInputElement;

      // Use previousElementSibling to get the previous input element
      const previousElement =
        target.previousElementSibling as HTMLInputElement | null;

      // Focus on the previous input element if it exists and is an input element
      if (previousElement && previousElement.tagName === "INPUT") {
        (previousElement as HTMLInputElement).focus();
      }
    }
  };

  return (
    <AuthPage imageUrl={verifyEmailImage}>
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
          Enter OTP
        </h2>
        <h3 className="font-regular text-grey text-center opacity-60 text-base md:text-[18px] lg:text-left">
          We have share a code to your registered email address
        </h3>
      </div>

      {/**** Form */}
      <form className="w-full flex flex-col gap-y-4 mt-2" action="">
        <section className="w-max mx-auto space-x-3 lg:w-max-none lg:mx-0">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              name="otp"
              autoComplete="off"
              maxLength={1}
              value={data}
              className={`outline-none w-[30px] h-[30px] bg-transparent border-[1.5px] text-black text-[20px] text-center font-semibold rounded-md focus:border-black sm:w-[40px] sm:h-[40px] ${
                String(data) && "!border-black"
              }`}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </section>

        <FormButton>Verify</FormButton>
      </form>
    </AuthPage>
  );
}
