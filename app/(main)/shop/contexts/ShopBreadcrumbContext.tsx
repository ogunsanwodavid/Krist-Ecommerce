"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface ShopBreadcrumbContextType {
  shopBreadcrumbs: string[];
  setShopBreadcrumb: (segments: string[]) => void;
}

const ShopBreadcrumbContext = createContext<
  ShopBreadcrumbContextType | undefined
>(undefined);

export const ShopBreadcrumbProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [shopBreadcrumbs, setShopBreadcrumbs] = useState<string[]>([]);

  const setShopBreadcrumb = useCallback((segments: string[]) => {
    setShopBreadcrumbs(segments);
  }, []); // Memoized, doesn't recreate on every render

  return (
    <ShopBreadcrumbContext.Provider
      value={{ shopBreadcrumbs, setShopBreadcrumb }}
    >
      {children}
    </ShopBreadcrumbContext.Provider>
  );
};

export const useShopBreadcrumb = () => {
  const context = useContext(ShopBreadcrumbContext);
  if (!context) {
    throw new Error(
      "useShopBreadcrumb must be used within a ShopBreadcrumbProvider"
    );
  }
  return context;
};
