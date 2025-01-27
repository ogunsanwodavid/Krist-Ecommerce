import type { Metadata } from "next";

import "./globals.css";

import { Jost } from "next/font/google";

import ReduxProvider from "./providers/ReduxProvider";
import QueryProvider from "./providers/QueryProvider";

import AuthProvider from "@/contexts/AuthContext";

import { ItemVariationModalProvider } from "./(main)/contexts/ItemVariationModalContext";
import { NewAddressModalProvider } from "./(main)/contexts/NewAddressModalContext";
import { NewCardModalProvider } from "./(main)/contexts/NewCardModalContext";

import LayoutContent from "./components/LayoutContent";
import ToastProvider from "./components/ToastProvider";

//Jost google font
const jost = Jost({
  subsets: ["latin"], // Choose subsets you need
  weight: ["400", "500", "600", "700"], // Specify weights
  style: ["normal", "italic"], // Specify styles
  display: "swap",
});

//General metadata including opengraph information
export const metadata: Metadata = {
  title: "Krist",
  description:
    "Discover Krist, your ultimate destination for stylish and affordable men’s, women’s, and kids' wear. Explore a wide range of trendy outfits designed for every occasion and elevate your wardrobe with our premium-quality apparel. Shop now and experience fashion redefined!",
  openGraph: {
    title: "Krist",
    description:
      "Discover Krist, your ultimate destination for stylish and affordable men’s, women’s, and kids' wear. Explore a wide range of trendy outfits designed for every occasion and elevate your wardrobe with our premium-quality apparel. Shop now and experience fashion redefined!",
    images:
      "https://res.cloudinary.com/ddcjuf3hq/image/upload/v1737908712/krist-og-image_rlbpuo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //Site URL
  const siteUrl =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";

  console.log(siteUrl);

  return (
    <html lang="en">
      <body className={`${jost.className} `} suppressHydrationWarning>
        <AuthProvider>
          <ReduxProvider>
            <QueryProvider>
              <ToastProvider>
                <ItemVariationModalProvider>
                  <NewAddressModalProvider>
                    <NewCardModalProvider>
                      <LayoutContent>{children}</LayoutContent>
                    </NewCardModalProvider>
                  </NewAddressModalProvider>
                </ItemVariationModalProvider>
              </ToastProvider>
            </QueryProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
