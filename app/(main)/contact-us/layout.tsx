export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative w-full flex-grow mx-auto px-3 py-8 md:px-6 md:py-10 space-y-3 bg-fixed bg-no-repeat bg-cover bg-center lg:px-0 lg:space-y-5"
      style={{
        backgroundImage: "url('/contact-us-bg.webp')",
      }}
    >
      {/** Background fader */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)]"></div>

      {/** Inner container */}
      <div className="relative space-y-3 max-w-[600px] mx-auto pb-10 z-10 md:space-y-5 lg:pb-16 lg:max-w-[1060px] md:pt-14 lg:pt-24">
        {children}
      </div>
    </div>
  );
}
