"use client";

import { createContext } from "react";
import { useShowDialog } from "@/components/dialog/SnackBarDialog";

export const ModalContext = createContext({
  openSnackBarModal: () => {},
});

export default function ModalProvider({ children }) {
  const { openSnackBarModal, ShowSnackBarModal } = useShowDialog();

  return (
    <ModalContext.Provider value={{ openSnackBarModal }}>
      <ShowSnackBarModal />
      {children}
    </ModalContext.Provider>
  );
}
