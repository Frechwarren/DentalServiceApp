"use client";

import { useContext, useEffect } from "react";
import { ModalContext } from "../context/ModalProvide";

const Snackbar = () => {
  const { openModal, openModalHandler } = useContext(ModalContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      openModalHandler(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-[100px] h-[50px]border-1 border-green-500 overflow-hidden"
      hidden={openModal}
    >
      <p className="text-gray-800 text-center text-sm">Successfully created</p>
    </div>
  );
};

export default Snackbar;
