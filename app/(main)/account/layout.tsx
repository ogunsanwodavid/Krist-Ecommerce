"use client";

import React, { useEffect } from "react";

import { redirect } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import AccountNav from "./components/AccountNav";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Variables from Auth context
  const { isAuthenticated } = useAuth();

  //If user is unauthenticated redirect to home
  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-3 py-8 md:px-6 md:py-10 space-y-3 lg:px-0 lg:space-y-5">
      {/** Inner container */}
      <div className="space-y-2  max-w-[600px] mx-auto pb-10 md:space-y-4 lg:pb-16 lg:max-w-none">
        {/** Header */}
        <header>
          <h2 className="text-black text-[23px] md:text-3xl">My Account</h2>
        </header>

        {/** Main section */}
        <div className="space-y-3 lg:space-y-0 lg:flex lg:gap-x-[60px]">
          {/** Account page navigation */}
          <AccountNav />

          {/** Children */}
          <div className="h-max">{children}</div>
        </div>
      </div>
    </div>
  );
}
