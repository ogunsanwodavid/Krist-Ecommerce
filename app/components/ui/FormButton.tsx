import React, { MouseEventHandler } from "react";

interface FormButtonProps {
  onClick?: MouseEventHandler;
  children: React.ReactNode;
}

export default function FormButton({ onClick, children }: FormButtonProps) {
  return (
    <button
      className="w-full h-[44px] rounded-[10px] bg-black text-white text-base md:text-[18px]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
