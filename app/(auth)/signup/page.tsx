"use client";

import AuthPage from "../components/AuthPage";

import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

import signupImage from "@/public/signup.png";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUp() {
  //State of display password inputs contents
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  //Functions to display password inputs contents
  function togglePasswordVisibility() {
    setShowPassword((prev: boolean) => !prev);
  }

  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword((prev: boolean) => !prev);
  }

  return (
    <AuthPage imageUrl={signupImage}>
      {/*** Headings */}
      <div className="flex flex-col items-center gap-y-1 lg:items-start">
        <h2 className="font-semibold text-2xl text-center md:text-[26px]">
          Create New Account
        </h2>
        <h3 className="font-regular text-grey text-center opacity-60 text-base md:text-[18px] lg:text-left">
          Please enter your details
        </h3>
      </div>

      {/**** Form */}
      <form className="w-full flex flex-col gap-y-2" action="">
        {/**** First Name input */}
        <FormInput label="First Name" error="">
          <input
            type="text"
            autoComplete="off"
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey `}
          />
        </FormInput>

        {/**** Last Name input */}
        <FormInput label="Last Name" error="">
          <input
            type="text"
            autoComplete="off"
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey `}
          />
        </FormInput>

        {/**** Email Address input */}
        <FormInput label="Email Address" error="">
          <input
            type="text"
            autoComplete="off"
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey `}
          />
        </FormInput>

        {/**** Password input */}
        <FormInput label="Password" error="">
          <main className="flex items-center h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-3 k gap-x-1">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              className={`w-full outline-none text-base text-black placeholder:text-base placeholder:text-grey `}
            />

            <div className="w-max" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FiEyeOff className="text-black text-lg" />
              ) : (
                <FiEye className="text-black text-lg" />
              )}
            </div>
          </main>
        </FormInput>

        {/**** Confirm Password input */}
        <FormInput label="Confirm Password" error="">
          <main className="flex items-center h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-3 k gap-x-1">
            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="off"
              className={`w-full outline-none text-base text-black placeholder:text-base placeholder:text-grey `}
            />

            <div className="w-max" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <FiEyeOff className="text-black text-lg" />
              ) : (
                <FiEye className="text-black text-lg" />
              )}
            </div>
          </main>
        </FormInput>

        <FormButton>Signup</FormButton>
      </form>
    </AuthPage>
  );
}
