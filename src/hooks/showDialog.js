"use client";

import { useState } from "react";

export function useShowDialog() {
  const [openModal, setOpenModal] = useState(true);
  const openModalComponent = (open) => {
    setOpenModal(open);
  };
  return { openModal, openModalComponent };
}
