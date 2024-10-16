import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputFrom";
import React from "react";
import Link from "next/link";

const Register = () => {
  return (
    <form className="flex flex-col gap-4">
      <InputForm
        label="Name"
        name="name"
        type="text"
        placeholder="Masukkan nama"
      />
      <InputForm
        label="Username"
        name="email"
        type="email"
        placeholder="Masukkan email"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="Masukkan password"
      />
      <Button size={"w-full"} textButton="Register"></Button>
      {/* <p className="text-sm text-center mt-2">
        {`Already have an account? `}
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </p> */}
    </form>
  );
};

export default Register;
