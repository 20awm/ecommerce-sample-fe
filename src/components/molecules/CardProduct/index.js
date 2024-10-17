import { useEffect, useState } from "react";
import { fetchImage } from "../../../services/images";
import Button from "@/components/atoms/Button";
import React from "react";

export default function CardProduct({ children }) {
  return (
    <div className="rounded-lg bg-gradient-to-r from-violet-500 via-blue-500 to bg-sky-600 p-1 shadow-xl">
      <div className="w-full max-w-xs bg-white rounded-lg flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
}

function Header({ productId }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function loadImage() {
      const url = await fetchImage(productId);
      setImageSrc(url);
    }
    loadImage();
  }, [productId]);

  return (
    <img
      src={imageSrc}
      alt="Product Image"
      className="rounded-t-lg w-full h-48 object-contain"
    />
  );
}

function Body({ title, desc, onClick }) {
  return (
    <div className="px-5 pb-5 flex-grow">
      <h3
        className="text-xl font-bold text-slate-900 cursor-pointer"
        onClick={onClick}
      >
        {title}
      </h3>
      <p className="text-sm mt-3 text-slate-700 text-base text-justify">
        {desc}
      </p>
    </div>
  );
}

function Footer({ price, onClick, userRole }) {
  const [storedRole, setStoredRole] = useState(""); // Initialize with an empty string

  useEffect(() => {
    // Fetch the role from localStorage when the component mounts
    const roleFromLocalStorage = localStorage.getItem("role");
    setStoredRole(roleFromLocalStorage);
  }, []);

  const handleButtonClick = () => {
    if (storedRole === "customer") {
      onClick();
    } else {
      // Handle other actions for owners (e.g., navigate to edit page)
      console.log("Edit button clicked for owner");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-5 pb-5">
      <span className="text-2xl font-semibold mb-2">Price ${price}</span>
      <Button
        size="w-full"
        color="bg-blue-500"
        textButton={storedRole === "owner" ? "Edit" : "Buy"}
        onClick={handleButtonClick}
      />
    </div>
  );
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;
