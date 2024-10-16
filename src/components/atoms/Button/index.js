import React from "react";

const Button = ({
  type = "button",
  color = "bg-blue-500 hover:bg-blue-700",
  textButton = "Button",
  size,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-10 px-6 font-semibold text-white rounded-md ${color} ${size}`}
    >
      {textButton}
    </button>
  );
};

export default Button;
