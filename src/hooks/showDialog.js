"use client";

import { useState } from "react";

export function useShowDialog() {
  const [openModal, setOpenModal] = useState(true);
  const openModalHandler = (open) => {
    setOpenModal(open);
  };
  return { openModal, openModalHandler };
}
