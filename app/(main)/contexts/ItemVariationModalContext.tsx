"use client";

import { createContext, useState, useContext, ReactNode } from "react";

import { ShopItem } from "@/app/models/shop";

import ItemVariationModal from "../components/ItemVariationModal";

// Type for Item Variation Modal Context
interface ItemVariationModalContextType {
  isVariationModalOpen: boolean;
  openVariationModal: (item: ShopItem, quantity: number) => void;
  closeVariationModal: () => void;
  selectedItem: ShopItem | null;
  quantity: number;
}

// Item Variation Modal context
const ItemVariationModalContext = createContext<
  ItemVariationModalContextType | undefined
>(undefined);

// Item Variation ModalProvider Component
interface ItemVariationModalProviderProps {
  children: ReactNode;
}

export const ItemVariationModalProvider: React.FC<
  ItemVariationModalProviderProps
> = ({ children }) => {
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  //const [size, setSize] = useState<string | undefined>(undefined);
  //const [color, setColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  const openVariationModal = (item: ShopItem, quantity: number) => {
    setSelectedItem(item);
    setIsVariationModalOpen(true);
    setQuantity(quantity);
  };

  const closeVariationModal = () => {
    setIsVariationModalOpen(false);
    setSelectedItem(null);
    //setSize(undefined);
    // setColor(undefined);
    setQuantity(1);
  };

  return (
    <ItemVariationModalContext.Provider
      value={{
        isVariationModalOpen,
        openVariationModal,
        closeVariationModal,
        selectedItem,
        quantity,
      }}
    >
      {children}

      {/** Render Is Variation Modal */}
      {isVariationModalOpen && <ItemVariationModal />}
    </ItemVariationModalContext.Provider>
  );
};

// Custom Hook to use the ModalContext
export const useItemVariationModal = () => {
  const context = useContext(ItemVariationModalContext);
  if (!context) {
    throw new Error(
      "useItemVariationModal must be used within a ItemVariationModalProvider"
    );
  }
  return context;
};
