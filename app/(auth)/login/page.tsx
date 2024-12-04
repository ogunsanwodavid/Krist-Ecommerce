"use client";

import { useActionState, useState } from "react";

import Link from "next/link";

import { login } from "../actions/auth";

import AuthPage from "../components/AuthPage";

import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

import { FiEye, FiEyeOff } from "react-icons/fi";

import { FaCheck } from "react-icons/fa";

import loginImage from "@/public/login.png";

export default function Login() {
  //State of display password input content
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //Function to display password input content
  function togglePasswordVisibility() {
    setShowPassword((prev: boolean) => !prev);
  }

  //State of login form
  const [state, action] = useActionState(login, undefined);

  //Error states of login form
  const emailInputError = state?.errors?.email?.at(0);
  const passwordInputError = state?.errors?.password?.at(0);

  return (
    <AuthPage imageUrl={loginImage}>
      {/*** Headings */}
      <div className="flex flex-col items-center gap-y-0 lg:items-start">
        <h2 className="font-semibold text-2xl text-center md:text-[26px]">
          Welcome
        </h2>
        <h3 className="font-regular text-grey text-center opacity-60 text-base md:text-[18px] lg:text-left">
          Please login here
        </h3>
      </div>

      {/**** Form */}
      <form action={action} className="w-full flex flex-col gap-y-4">
        {/***** Email address input */}
        <FormInput label="Email Address" error={emailInputError}>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            defaultValue={state?.currentState?.email || ""} // Retain input value
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
              emailInputError && "!border-errorRed"
            }`}
          />
        </FormInput>

        {/**** Password input */}
        <FormInput label="Password" error={passwordInputError}>
          <main
            className={`flex items-center h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-3 k gap-x-1 ${
              passwordInputError && "!border-errorRed"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="off"
              defaultValue={state?.currentState?.password || ""} // Retain input value
              className="w-full outline-none text-base text-black placeholder:text-base placeholder:text-grey"
            />

            <div className="w-max" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FiEyeOff
                  className={`text-black text-lg ${
                    passwordInputError && "!text-errorRed"
                  }`}
                />
              ) : (
                <FiEye
                  className={`text-black text-lg ${
                    passwordInputError && "!text-errorRed"
                  }`}
                />
              )}
            </div>
          </main>
        </FormInput>

        {/*** Remember me checkbox */}
        <section className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-x-2" htmlFor="rememberMe">
            {/*** Hidden input */}
            <input
              type="checkbox"
              id="rememberMe"
              defaultValue={state?.currentState?.rememberMe} // Retain input value
              name="rememberMe"
              className="hidden peer"
            />

            {/* Custom Checkbox */}
            <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black">
              <FaCheck className="text-white text-[0.6rem]" />
            </span>

            <span className="md:text-lg">Remember Me</span>
          </label>

          {/**** Forgot Password */}
          <Link
            href="/forgotpassword"
            className="text-[14px] text-black lg:text-base"
          >
            Forgot Password?
          </Link>
        </section>

        <FormButton>Login</FormButton>
      </form>
    </AuthPage>
  );
}
