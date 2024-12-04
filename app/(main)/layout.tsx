import React from "react";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>MainApp {children}</div>;
}
