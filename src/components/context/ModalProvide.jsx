"use client";

import { createContext, useContext } from "react";
// import { useShowDialog } from "@/components/dialog/SnackBarDialog";
import { useShowDialog } from "@/hooks/showDialog";
import SuccessDialog from "../layout/SuccessDialog";

export const ModalContext = createContext({
  openModal: true,
  openModalComponent: () => {},
});

export default function ModalProvider({ children }) {
  const { openModal, openModalComponent } = useShowDialog();

  return (
    <ModalContext.Provider value={{ openModal, openModalComponent }}>
      {/* <ShowSnackBarModal /> */}
      <SuccessDialog />
      {children}
    </ModalContext.Provider>
  );
}

export const modalTriggerContext = () => useContext(ModalContext);
