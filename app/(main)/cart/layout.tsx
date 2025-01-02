export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full max-w-[1000px] mx-auto px-3 py-8 md:px-6 md:py-10 space-y-3 lg:px-0 lg:space-y-5">
      {children}
    </div>
  );
}
