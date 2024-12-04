import React, { MouseEventHandler } from "react";

interface FormButtonProps {
  disabled?: boolean;
  onClick?: MouseEventHandler;
  children: React.ReactNode;
}

export default function FormButton({
  disabled,
  onClick,
  children,
}: FormButtonProps) {
  return (
    <button
      className="w-full h-[44px] rounded-[10px] bg-black text-white text-base disabled:bg-[rgb(19,17,24,0.7)] md:text-[18px]"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
