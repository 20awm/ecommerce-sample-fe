import React from "react";

const Card = ({ children, cardClassName }) => {
  return (
    <>
      <div className={`border rounded-lg shadow-lg w-[300px] ${cardClassName}`}>
        {children}
      </div>
    </>
  );
};

export default Card;
