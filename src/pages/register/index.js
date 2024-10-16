import Register from "@/components/organism/Register";
import AuthLayout from "@/components/templates/AuthLayout";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <AuthLayout
          title={"Register"}
          desc={"Register a new account"}
          type="register"
        >
          <Register />
        </AuthLayout>
      </div>
    </>
  );
};

export default RegisterPage;
