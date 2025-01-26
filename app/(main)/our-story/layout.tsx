export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      {/** Inner container */}
      <div className="space-y-3  pb-10 md:space-y-5 lg:pb-16">{children}</div>
    </div>
  );
}
