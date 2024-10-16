import Login from "@/components/organism/Login";
import AuthLayout from "@/components/templates/AuthLayout";
import React, { useState } from "react";

const LoginPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleChange() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <AuthLayout title={"Login"} desc={"Login to your account"} type="login">
          <Login />
        </AuthLayout>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-black text-white p-4" onClick={handleChange}>
          Dark Mode
        </button>
      </div>
    </>
  );
};

export default LoginPage;
