import ShopBreadcrumbNav from "./components/ShopBreadcrumbNav";
import { ShopBreadcrumbProvider } from "./contexts/ShopBreadcrumbContext";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-3 py-8 md:px-6 md:py-10 space-y-3 lg:px-0 lg:space-y-5">
      <ShopBreadcrumbProvider>
        {/*** Bread Crumb Navigation */}
        <ShopBreadcrumbNav />

        {children}
      </ShopBreadcrumbProvider>
    </div>
  );
}
