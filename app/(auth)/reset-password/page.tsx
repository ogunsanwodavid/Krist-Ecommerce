"use client";

import { useState } from "react";

import { redirect } from "next/navigation";

import { resetPassword } from "../actions/reset-password";

import { toast } from "react-toastify";

import AuthPage from "../components/AuthPage";

import FormInput from "@/app/components/ui/FormInput";
import FormButton from "@/app/components/ui/FormButton";

import { FiEye, FiEyeOff } from "react-icons/fi";

import resetPasswordImage from "@/public/reset-password.png";

export default function ResetPassword() {
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

  //Type of the error state of the reset password form
  type ResetPasswordFormErrors = {
    password?: string[];
    confirmPassword?: string[];
  } | null;

  //States of the input and error state
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<ResetPasswordFormErrors>(null); // To store validation errors

  //Error states of reset password form
  const passwordInputError = errors?.password?.at(0);
  const confirmPasswordInputError = errors?.confirmPassword?.at(0);

  //Loading state of password reset
  const [isResettingPassword, setIsResettingPassword] =
    useState<boolean>(false);

  //Function to submit reset password form
  const handleSubmit = async (e: React.FormEvent) => {
    //Set Loading state true
    setIsResettingPassword(true);

    //Prevent default
    e.preventDefault();

    // Collect form data
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    // Call the reset password
    const result = await resetPassword(formData);

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
      toast.success("Password successfully reset");

      //Redirect to HOME page
      redirect("/");
    }

    //Set Loading state false
    setIsResettingPassword(false);
  };

  return (
    <AuthPage imageUrl={resetPasswordImage}>
      {/*** Headings */}
      <div className="flex flex-col items-center gap-y-1 lg:items-start">
        <h2 className="font-semibold text-2xl text-center md:text-[26px]">
          Reset Password
        </h2>
        <h3 className="font-regular text-grey text-center opacity-60 text-base md:text-[18px] lg:text-left">
          Please enter your new password
        </h3>
      </div>

      {/**** Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-2">
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

        {/***** Submit button */}
        <FormButton
          loading={isResettingPassword}
          disabled={isResettingPassword}
        >
          Reset
        </FormButton>
      </form>
    </AuthPage>
  );
}
