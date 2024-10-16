import React from "react";
import Button from "../Button";

const Modal = ({ handleClose, handleLogout }) => {
  return (
    <>
      <div className="fixed z-10 inset-0">
        <div className="min-h-screen">
          <div className="flex justify-center items-center inset-0 bg-gray-500 bg-opacity-75 h-screen">
            <div className="inline-block bg-white rounded-xl p-5 max-w-lg align-middle w-full shadow-xl overflow-hidden transform">
              <div className="flex flex-col">
                <span className="font-bold text-lg mb-2">
                  Konfirmasi Logout
                </span>
                <p>Are you sure you want to log out?</p>
                <div className="flex justify-end mt-5 gap-3">
                  <Button
                    color="bg-gray-500 text-white"
                    textButton="Cancel"
                    onClick={handleClose}
                  />
                  <Button
                    color="bg-red-500 text-white"
                    textButton="Yes"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
