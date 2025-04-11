"use client";

import { createContext, useContext } from "react";
import { useShowDialog } from "@/hooks/showDialog";
import ShowSnackBarModal from "@/components/dialog/SnackBarDialog";
import SuccessDialog from "../layout/SuccessDialog";

export const ModalContext = createContext({
  openModal: true,
  openModalHandler: () => {},
});

export default function ModalProvider({ children }) {
  const { openModal, openModalHandler } = useShowDialog();

  return (
    <ModalContext.Provider value={{ openModal, openModalHandler }}>
      <ShowSnackBarModal />
      <SuccessDialog />
      {children}
    </ModalContext.Provider>
  );
}

export const modalTriggerContext = () => useContext(ModalContext);
