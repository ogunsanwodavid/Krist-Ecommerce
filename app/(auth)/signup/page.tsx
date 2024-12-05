"use client";

import { useState } from "react";

import { signup } from "../actions/auth";

import AuthPage from "../components/AuthPage";

import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

import signupImage from "@/public/signup.png";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

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

  //Type of the error state of the signup form
  type SignupFormErrors = {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  } | null;

  //States of the input and error state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<SignupFormErrors>(null); // To store validation errors

  //Error states of signup form
  const firstNameInputError = errors?.firstName?.at(0);
  const lastNameInputError = errors?.lastName?.at(0);
  const emailInputError = errors?.email?.at(0);
  const passwordInputError = errors?.password?.at(0);
  const confirmPasswordInputError = errors?.confirmPassword?.at(0);

  //Loading state of signup
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  //Function to submit signup form
  const handleSubmit = async (e: React.FormEvent) => {
    //Set Loading state true
    setIsSigningUp(true);

    //Prevet default
    e.preventDefault();

    // Collect form data
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    // Call the login function
    const result = await signup(formData);

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
      toast.success("User successfully created");

      //Redirect to login page
      redirect("/login");
    }

    //Set Loading state false
    setIsSigningUp(false);
  };

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
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-2">
        {/**** First Name input */}
        <FormInput label="First Name" error={firstNameInputError}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
              firstNameInputError && "!border-errorRed"
            }`}
          />
        </FormInput>

        {/**** Last Name input */}
        <FormInput label="Last Name" error={lastNameInputError}>
          <input
            type="text"
            name="lastName"
            id="lastName"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
              lastNameInputError && "!border-errorRed"
            }`}
          />
        </FormInput>

        {/**** Email Address input */}
        <FormInput label="Email Address" error={emailInputError}>
          <input
            type="text"
            name="email"
            id="email"
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
                <FiEyeOff className="text-black text-lg" />
              ) : (
                <FiEye className="text-black text-lg" />
              )}
            </div>
          </main>
        </FormInput>

        {/**** Confirm Password input */}
        <FormInput label="Confirm Password" error={confirmPasswordInputError}>
          <main
            className={`flex items-center h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-3 k gap-x-1 ${
              confirmPasswordInputError && "!border-errorRed"
            }`}
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full outline-none text-base text-black placeholder:text-base placeholder:text-grey"
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

        {/*** Agree to Terms checkbox */}
        <section className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-x-2" htmlFor="agreeToTerms">
            {/*** Hidden input */}
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="hidden peer"
            />

            {/* Custom Checkbox */}
            <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black">
              <FaCheck className="text-white text-[0.6rem]" />
            </span>

            <span className="flex gap-x-1 md:text-lg">
              <span>I agree to the</span>
              <span className="font-semibold">Terms and Conditions</span>
            </span>
          </label>
        </section>

        {/***** Submit button */}
        <FormButton
          loading={isSigningUp}
          disabled={!agreeToTerms || isSigningUp}
        >
          Signup
        </FormButton>
      </form>
    </AuthPage>
  );
}
