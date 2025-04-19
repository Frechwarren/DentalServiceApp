"use client";

import { useState } from "react";

export function useShowDialog() {
  const [openBookedModal, setOpenBookedModal] = useState(true);
  const [openSignUpModal, setOpenSignUpModal] = useState(true);

  const openBookedModalHandler = (open) => {
    setOpenBookedModal(open);
  };

  const openSignUpModalHandler = (open) => {
    setOpenSignUpModal(open);
  };
  return { openBookedModal, openSignUpModal, openBookedModalHandler, openSignUpModalHandler };
}
