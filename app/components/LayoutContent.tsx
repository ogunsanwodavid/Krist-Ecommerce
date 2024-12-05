"use client";

import React from "react";

import { usePathname } from "next/navigation";

import ToastProvider from "./ToastProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  //Pathname function
  const pathname = usePathname();

  // Define routes where Navbar and Footer should not appear
  const authRoutes = ["/login", "/signup", "/forgot-password", "/verify-email"];

  //Check if route is an auth page
  const isAuthPage = authRoutes.includes(pathname);

  return (
    <>
      {/*** Render Navbar if it is not an auth page */}
      {!isAuthPage && <Navbar />}

      {/*** Main content wrapped in the toast provider */}
      <ToastProvider>{children}</ToastProvider>

      {/*** Render Footer if it is not an auth page */}
      {!isAuthPage && <Footer />}
    </>
  );
}
