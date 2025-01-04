"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { redirect } from "next/navigation";

import { login } from "../actions/login";

import AuthPage from "../components/AuthPage";

import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

import { toast } from "react-toastify";

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

  //Type of the error state of the login form
  type LoginFormErrors = {
    email?: string[];
    password?: string[];
    rememberMe?: string[];
  } | null;

  //States of the input and error state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginFormErrors>(null); // To store validation errors

  //Error states of login form
  const emailInputError = errors?.email?.at(0);
  const passwordInputError = errors?.password?.at(0);

  //Loading state of login
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  //Function to submit login form
  const handleSubmit = async (e: React.FormEvent) => {
    //Set Loading state true
    setIsLoggingIn(true);

    //Prevent default
    e.preventDefault();

    // Collect form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("rememberMe", String(rememberMe));

    // Call the login function
    const result = await login(formData);

    //Set errors is it exists else set to null
    if (result?.errors) {
      setErrors(result.errors); // Set validation errors
    } else {
      setErrors(null);
    }

    //Check for error from server
    if (result?.error) {
      //Toast error
      toast.error(result.error);
    }

    //Check if request is successful
    if (result.success) {
      //Toast success
      toast.success("Login successful!");

      //Redirect to home page
      redirect("/");
    }

    //Set Loading state false
    setIsLoggingIn(false);
  };

  //Check if it is a signup email confirmation redirect
  useEffect(() => {
    // Check for the hash fragment
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // Remove '#' and parse
      const type = params.get("type");

      if (type === "signup") {
        toast.success("Your email has been confirmed! Please login.");
      }
    }
  }, []);

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
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        {/***** Email address input */}
        <FormInput label="Email Address" error={emailInputError}>
          <input
            type="text"
            id="email"
            name="email"
            //autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
            href="/forgot-password"
            className="text-[14px] text-black lg:text-base"
          >
            Forgot Password?
          </Link>
        </section>

        {/***** Submit button */}
        <FormButton loading={isLoggingIn} disabled={isLoggingIn}>
          Login
        </FormButton>
      </form>
    </AuthPage>
  );
}
