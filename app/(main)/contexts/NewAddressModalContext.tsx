"use client";

import { createContext, useState, useContext, ReactNode } from "react";

import NewAddressModal from "../components/NewAddressModal";

// Type for New Address Modal Context
interface NewAddressModalContextType {
  isNewAddressModalOpen: boolean;
  openNewAddressModal: () => void;
  closeNewAddressModal: () => void;
}

// New Address Modal context
const NewAddressModalContext = createContext<
  NewAddressModalContextType | undefined
>(undefined);

// New Address Modal Provider Component
interface NewAddressModalProviderProps {
  children: ReactNode;
}

export const NewAddressModalProvider: React.FC<
  NewAddressModalProviderProps
> = ({ children }) => {
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);

  const openNewAddressModal = () => {
    setIsNewAddressModalOpen(true);
  };

  const closeNewAddressModal = () => {
    setIsNewAddressModalOpen(false);
  };

  return (
    <NewAddressModalContext.Provider
      value={{
        isNewAddressModalOpen,
        openNewAddressModal,
        closeNewAddressModal,
      }}
    >
      {children}

      {/** Render New Address Modal */}
      {isNewAddressModalOpen && <NewAddressModal />}
    </NewAddressModalContext.Provider>
  );
};

// Custom Hook to use the ModalContext
export const useNewAddressModal = () => {
  const context = useContext(NewAddressModalContext);
  if (!context) {
    throw new Error(
      "useNewAddressModal must be used within a NewAddressModalProvider"
    );
  }
  return context;
};
