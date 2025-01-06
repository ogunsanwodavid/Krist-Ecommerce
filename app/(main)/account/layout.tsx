"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import { toast } from "react-toastify";

import { CircularProgress } from "@mui/material";

import AccountNav from "./components/AccountNav";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Router function
  const router = useRouter();

  //Variables from Auth context
  const { isAuthenticated, isGettingUser } = useAuth();

  //If user is unauthenticated redirect to home
  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) {
      toast.error("Unauthorized access, login");
      router.push("/login");
    }
  }, [isAuthenticated, router, isGettingUser]);

  //Return loader when getting user
  if (isGettingUser) {
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-3 py-8 md:px-6 md:py-10 space-y-3 lg:px-0 lg:space-y-5">
      {/** Inner container */}
      <div className="space-y-2  max-w-[600px] mx-auto pb-10 md:space-y-4 lg:pb-16 lg:max-w-none">
        {/** Header */}
        <header>
          <h2 className="text-black text-[23px] md:text-3xl">My Account</h2>
        </header>

        {/** Main section */}
        <div className="space-y-5 lg:space-y-0 lg:flex lg:gap-x-[60px]">
          {/** Account page navigation */}
          <AccountNav />

          {/** Children */}
          <div className="w-full h-max">{children}</div>
        </div>
      </div>
    </div>
  );
}
