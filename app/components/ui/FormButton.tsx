import React, { MouseEventHandler } from "react";

import { CircularProgress } from "@mui/material";

interface FormButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler;
  children: React.ReactNode;
  className?: string;
}

export default function FormButton({
  disabled,
  loading,
  onClick,
  children,
  className,
}: FormButtonProps) {
  return (
    <button
      className={`w-full h-[44px] flex items-center justify-center rounded-[10px] bg-black text-white text-base disabled:bg-[rgb(19,17,24,0.8)] md:text-[18px] ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <CircularProgress color="inherit" size={25} /> : children}
    </button>
  );
}
