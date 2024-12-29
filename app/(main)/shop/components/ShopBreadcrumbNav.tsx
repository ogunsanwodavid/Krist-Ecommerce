"use client";

import Link from "next/link";

import { useShopBreadcrumb } from "../contexts/ShopBreadcrumbContext";

export default function ShopBreadcrumbNav() {
  const { shopBreadcrumbs } = useShopBreadcrumb();

  return (
    <nav className="hidden lg:block">
      <p className="text-[14px] md:text-base text-black whitespace-nowrap overflow-hidden">
        {shopBreadcrumbs.map((segment, index) => {
          const href = index === 0 ? "/" : index === 1 ? "/shop" : "";
          const isLast = index === shopBreadcrumbs.length - 1;

          return (
            <span
              key={href}
              className="inline-flex mr-1 gap-x-1 md:mr-2 md:gap-x-2"
            >
              {index > 0 && (
                //<PiCaretRight className="mx-1 text-black text-sm md:text-base" />
                <span>{">"}</span>
              )}
              {isLast ? (
                <span className="opacity-70">
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </span>
              ) : (
                <Link href={href} className="hover:underline">
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              )}
            </span>
          );
        })}
      </p>
    </nav>
  );
}
