"use client";

import { createContext, useContext } from "react";
import { useShowDialog } from "@/hooks/showDialog";
import SignUpModal from "@/components/modal/SignUpModal";
import BookedModal from "../modal/BookedModal";

export const ModalContext = createContext({
  openBookedModal: true,
  openSignUpModal: true,
  openBookedModalHandler: () => {},
  openSignUpModalHandler: () => {},
});

export default function ModalProvider({ children }) {
  const {
    openBookedModal,
    openSignUpModal,
    openBookedModalHandler,
    openSignUpModalHandler,
  } = useShowDialog();

  return (
    <ModalContext.Provider
      value={{
        openBookedModal,
        openSignUpModal,
        openBookedModalHandler,
        openSignUpModalHandler,
      }}
    >
      <SignUpModal />
      <BookedModal />
      {children}
    </ModalContext.Provider>
  );
}

export const modalTriggerContext = () => useContext(ModalContext);
