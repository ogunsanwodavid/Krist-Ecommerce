import React, { Suspense } from "react";

import { CircularProgress } from "@mui/material";

import ToastProvider from "../components/ToastProvider";

import { ItemVariationModalProvider } from "./contexts/ItemVariationModalContext";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <ItemVariationModalProvider>
        <Suspense
          fallback={
            <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
              <CircularProgress color="inherit" size={40} />
            </div>
          }
        >
          <div className="h-full flex-grow flex flex-col">{children}</div>
        </Suspense>
      </ItemVariationModalProvider>
    </ToastProvider>
  );
}
