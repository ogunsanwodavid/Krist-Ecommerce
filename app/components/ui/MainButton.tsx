import React, { MouseEventHandler } from "react";

interface MainButtonProps {
  disabled?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
  children: React.ReactNode;
}

export default function MainButton({
  disabled,
  onClick,
  className,
  children,
}: MainButtonProps) {
  return (
    <button
      className={`h-[44px] bg-black text-white px-5 py-2 rounded-[10px] flex items-center justify-center lg:text-lg ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
