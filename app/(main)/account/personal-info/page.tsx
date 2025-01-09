"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { useAuth } from "@/contexts/AuthContext";

import { useUpdateProfile } from "@/app/actions/account/update-profile";
import { useUploadAvatar } from "@/app/actions/account/upload-avatar";

import { toast } from "react-toastify";

import { CircularProgress } from "@mui/material";

import FormInput from "@/app/components/ui/FormInput";

import EditProfileButton from "./components/EditProfileButton";

import { FaRegEdit, FaUserCircle } from "react-icons/fa";

export default function AccountPersonalInfo() {
  //Variables from Auth context
  const {
    user,
    isUpdatingProfile,
    setIsUpdatingProfile,
    isUploadingAvatar,
    setIsUploadingAvatar,
  } = useAuth();

  //User credentials
  const userId = user?.id;
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

  // Image file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handles click of avatar edit button
  const handleAvatarEditButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically click the file input
  };

  //Upload avatar function
  const uploadAvatar = useUploadAvatar();

  //Handle file input
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (!file) return;

    //Set loading state true
    setIsUploadingAvatar(true);

    // Upload the file (use the function defined earlier)
    const result = await uploadAvatar(file, userId ?? "");

    //Check for error from server
    if (result?.error) {
      //Toast error
      toast.error(result.error);
    }

    //Check if request is successful
    if (result.success) {
      //Toast success
      toast.success("User avatar uploaded succesfully");
    }

    //Set loading state false
    setIsUploadingAvatar(false);
  };

  return (
    <div className="space-y-3 lg:space-y-5">
      {/** Header */}
      <header>
        <h3 className="text-black text-[20px] lg:hidden">
          Personal Information
        </h3>
      </header>

      {/** Avatar section */}
      <section className="lg:flex lg:items-center lg:justify-between">
        {/** Change avatar */}
        <div className="relative w-max mx-auto lg:mx-0">
          {/** Avatar */}
          {userAvatar ? (
            <Image
              src={userAvatar}
              className="shrink-0 w-[75px] h-[75px] lg:w-[90px] lg:h-[90px] object-cover rounded-full "
              alt={`${userFirstName} ${userLastName}'s avatar`}
              width={75}
              height={75}
            />
          ) : (
            <FaUserCircle className="text-black text-[75px] lg:text-[90px]" />
          )}

          {/** Change avatar */}
          {!isUploadingAvatar && (
            <section className="absolute -right-1 bottom-1 w-max">
              {/** Avatar edit button */}
              <div
                className="p-1 bg-black rounded-[4px] flex items-center justify-center cursor-pointer"
                onClick={handleAvatarEditButtonClick}
              >
                <FaRegEdit className="text-[12px] text-white" />
              </div>

              {/** File input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden" // Hide the input element
                onChange={handleFileChange}
              />
            </section>
          )}

          {/** Loader if uploading avatar */}
          {isUploadingAvatar && (
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(184,178,178,0.3)] rounded-full flex items-center justify-center z-20">
              <CircularProgress color="inherit" size={25} />
            </div>
          )}
        </div>

        {/** Edit profile button */}
        <EditProfileButton
          className="!hidden !w-[180px] !ml-auto lg:!flex"
          loading={isUpdatingProfile}
          disabled={isUpdatingProfile}
          isEditingProfile={isEditingProfile}
          handleEditProfile={handleEditProfile}
          handleUpdateProfile={handleUpdateProfile}
        />
      </section>

      {/** Form */}
      <form className="w-full flex flex-col gap-y-2 lg:gap-y-5">
        {/** Name inputs */}
        <section className="space-y-2 lg:space-y-0 lg:flex lg:gap-x-[30px]">
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
        </section>

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
        className="lg:!hidden"
        loading={isUpdatingProfile}
        disabled={isUpdatingProfile}
        isEditingProfile={isEditingProfile}
        handleEditProfile={handleEditProfile}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
