"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useAuth } from "@/contexts/AuthContext";

import { useUpdateProfile } from "@/app/actions/account/update-profile";

import { toast } from "react-toastify";

import FormInput from "@/app/components/ui/FormInput";

import EditProfileButton from "../components/EditProfileButton";

import { FaRegEdit, FaUserCircle } from "react-icons/fa";

export default function AccountPersonalInfo() {
  //Variables from Auth context
  const { user, isUpdatingProfile, setIsUpdatingProfile } = useAuth();

  //User credentials
  const userFirstName = user?.firstName;
  const userLastName = user?.lastName;
  const userEmail = user?.email;
  const userAvatar = user?.avatar;

  //Type of the error state of the signup form
  type UpdateProfileFormErrors = {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
  } | null;

  //States of the input and error state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<UpdateProfileFormErrors>(null); // To store validation errors

  //Set initial input values
  useEffect(() => {
    setFirstName(userFirstName ?? "");
    setLastName(userLastName ?? "");
    setEmail(userEmail ?? "");
  }, [userFirstName, userLastName, userEmail]);

  //Error states of signup form
  const firstNameInputError = errors?.firstName?.at(0);
  const lastNameInputError = errors?.lastName?.at(0);
  const emailInputError = errors?.email?.at(0);

  //Loading states
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  //const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);

  //Function to edit profile
  const handleEditProfile = async (e: React.FormEvent) => {
    //Prevent default
    e.preventDefault();

    //Make form editable
    setIsEditingProfile(true);
  };

  //Update profile function
  const updateProfile = useUpdateProfile();

  //Function to submit update profile form
  const handleUpdateProfile = async (e: React.FormEvent) => {
    //Set Loading state true
    setIsUpdatingProfile(true);

    //Prevent default
    e.preventDefault();

    // Collect form data
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);

    // Call the update profile function
    const result = await updateProfile(formData);

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
      toast.success("Profile succesfully updated");
    }

    //Set Loading state false
    setIsUpdatingProfile(false);
  };

  return (
    <div className="space-y-3">
      {/** Header */}
      <header className="flex flex-col items-center justify-center">
        {/** Change avatar */}
        <div className="relative w-max">
          {/** Avatar */}
          {userAvatar ? (
            <Image
              src={userAvatar}
              className="w-[75px] h-[75px] shrink-0 object-cover rounded-full "
              alt="User avatar"
            />
          ) : (
            <FaUserCircle className="text-black text-[75px]" />
          )}

          {/** Avatar edit button */}
          <div className="absolute -right-1 bottom-1 w-max p-1 bg-black rounded-[4px] flex items-center justify-center">
            <FaRegEdit className="text-[12px] text-white" />
          </div>
        </div>
      </header>

      {/** Form */}
      <form className="w-full flex flex-col gap-y-2">
        {/**** First Name input */}
        <FormInput label="First Name" error={firstNameInputError}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            autoComplete="off"
            value={firstName}
            disabled={!isEditingProfile}
            onChange={(e) => {
              const value = e.target.value;
              const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic and non-space characters
              setFirstName(filteredValue);
            }}
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
            disabled={!isEditingProfile}
            onChange={(e) => {
              const value = e.target.value;
              const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic and non-space characters
              setLastName(filteredValue);
            }}
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
            value={email}
            disabled={!isEditingProfile}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey ${
              emailInputError && "!border-errorRed"
            }`}
          />
        </FormInput>
      </form>

      {/** Edit profile button */}
      <EditProfileButton
        className="!ml-auto"
        loading={isUpdatingProfile}
        disabled={isUpdatingProfile}
        isEditingProfile={isEditingProfile}
        handleEditProfile={handleEditProfile}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
