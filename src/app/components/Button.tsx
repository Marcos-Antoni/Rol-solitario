import React from "react";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="w-full mt-2 bg-[#18181b] hover:bg-[#46464d] text-white font-bold py-2 rounded"
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
