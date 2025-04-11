"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


function SnackBarDialog({ open, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      hidden={open}
    >
      <div className="fixed w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                  <Image
                    src="/check.svg"
                    alt="success"
                    height={20}
                    width={20}
                  />
                </div>
                <div className="text-center sm:mt-0 sm:ml-4 sm:text-left p-2">
                  <h3 className="text-base font-semibold text-zinc-700">
                    You have successfully booked an appointment
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function useShowDialog() {
  const [openSnackBar, setOpenSnackBar] = useState(true);
  const openSnackBarModal = (open) => {
    setOpenSnackBar(open);
  };

  const SnackBarComponent = () => {
    return <SnackBarDialog open={openSnackBar} onClose={setOpenSnackBar} />;
  };
  return { openSnackBarModal, ShowSnackBarModal: SnackBarComponent };
}
