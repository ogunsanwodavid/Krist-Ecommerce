import React, { MouseEventHandler } from "react";

import { Oval } from "react-loader-spinner";

interface FormButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler;
  children: React.ReactNode;
}

export default function FormButton({
  disabled,
  loading,
  onClick,
  children,
}: FormButtonProps) {
  return (
    <button
      className="w-full h-[44px] flex items-center justify-center rounded-[10px] bg-black text-white text-base disabled:bg-[rgb(19,17,24,0.8)] md:text-[18px]"
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? (
        <Oval
          visible={true}
          height="30"
          width="30"
          color="#fff"
          secondaryColor="rgba(255,255,255,0.5)"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        children
      )}
    </button>
  );
}
