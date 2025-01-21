"use client";

import { createContext, useState, useContext, ReactNode } from "react";

import NewAddressModal from "../components/NewAddressModal";

// Type for New Address Modal Context
interface NewAddressModalContextType {
  isNewAddressModalOpen: boolean;
  openNewAddressModal: () => void;
  closeNewAddressModal: () => void;
  isAddingNewAddress: boolean;
  setIsAddingNewAddress: (arg: boolean) => void;
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
  //Modal variables
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] =
    useState<boolean>(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);

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
        isAddingNewAddress,
        setIsAddingNewAddress,
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
