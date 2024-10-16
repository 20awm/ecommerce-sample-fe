import React from "react";

const Input = ({ type, placeholder, name }) => {
  return (
    <input
      type={type}
      className="text-sm rounded w-full py-2 px-3 text-slate-700 placeholder:text-slate-400"
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Input;
