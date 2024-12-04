import type { Metadata } from "next";

import "./globals.css";

import { Jost } from "next/font/google";

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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/small-dark-logo.svg"
          sizes="32x32"
        />
      </head>
      <body className={`${jost.className}`}>{children}</body>
    </html>
  );
}
