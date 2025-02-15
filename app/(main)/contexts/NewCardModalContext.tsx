"use client";

import { createContext, useState, useContext, ReactNode } from "react";

import NewCardModal from "../components/NewCardModal";

// Type for New Card Modal Context
interface NewCardModalContextType {
  isNewCardModalOpen: boolean;
  openNewCardModal: () => void;
  closeNewCardModal: () => void;
  isAddingNewCard: boolean;
  setIsAddingNewCard: (arg: boolean) => void;
}

// New Card Modal context
const NewCardModalContext = createContext<NewCardModalContextType | undefined>(
  undefined
);

// New Card Modal Provider Component
interface NewCardModalProviderProps {
  children: ReactNode;
}

export const NewCardModalProvider: React.FC<NewCardModalProviderProps> = ({
  children,
}) => {
  //Modal variables
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState<boolean>(false);
  const [isAddingNewCard, setIsAddingNewCard] = useState<boolean>(false);

  const openNewCardModal = () => {
    setIsNewCardModalOpen(true);
  };

  const closeNewCardModal = () => {
    setIsNewCardModalOpen(false);
  };

  return (
    <NewCardModalContext.Provider
      value={{
        isNewCardModalOpen,
        openNewCardModal,
        closeNewCardModal,
        isAddingNewCard,
        setIsAddingNewCard,
      }}
    >
      {children}

      {/** Render New Card Modal */}
      {isNewCardModalOpen && <NewCardModal />}
    </NewCardModalContext.Provider>
  );
};

// Custom Hook to use the ModalContext
export const useNewCardModal = () => {
  const context = useContext(NewCardModalContext);
  if (!context) {
    throw new Error(
      "useNewCardModal must be used within a NewCardModalProvider"
    );
  }
  return context;
};
