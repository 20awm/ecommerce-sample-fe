import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import React from "react";

const InputForm = ({ label, name, type, placeholder }) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder}></Input>
    </>
  );
};

export default InputForm;
