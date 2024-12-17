import React from "react";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full flex-grow flex flex-col">{children}</div>;
}
