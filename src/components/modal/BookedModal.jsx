"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "../context/ModalProvide";

const BookedModal = () => {
  const { openBookedModal, openBookedModalHandler } = useContext(ModalContext);

  const router = useRouter();

  let id = "asdasd";

  const handleConfirm = () => {
    router.push("/dashboard");
    openBookedModalHandler(true);
  };

  const handleLogin = () => {
    router.push("/login");
    openBookedModalHandler(true);
  };

  const handleCancel = () => {
    router.push("/");
    openBookedModalHandler(true);
  };

  return (
    <div
      className="relative"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      hidden={openBookedModal}
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-base font-semibold text-gray-900"
                      id="modal-title"
                    >
                      You have successfully booked an appointment
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {id === null
                          ? ""
                          : "To check your appointment details, please login to your account."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={id === null ? handleConfirm : handleLogin}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  {id === null ? "Confirm" : "Login"}
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const pageType = (type) => {
  switch (type) {
    case "login":
      return "/login";
    default:
      return "/";
  }
};

export default BookedModal;
