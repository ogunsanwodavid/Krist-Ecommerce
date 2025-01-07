import React from "react";

interface FormInputProps {
  label: string | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}

export default function FormInput({ label, error, children }: FormInputProps) {
  return (
    <div className="w-full flex flex-col gap-y-1">
      <span
        className={`text-black text-base md:text-[18px] ${
          error && "!text-errorRed"
        }`}
      >
        {label}
      </span>
      {children}
      <span className="text-errorRed text-[14px] md:text-base">{error}</span>
    </div>
  );
}
