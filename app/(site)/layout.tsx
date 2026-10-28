import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackdrop from "@/components/animated-backdrop";
import SpotlightEffect from "@/components/spotlight-effect";
import ActiveSectionContextProvider from "@/context/active-section-context";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pt-28 sm:pt-36">
      <AnimatedBackdrop />
      <SpotlightEffect />
      <ActiveSectionContextProvider>
        <Header />
        {children}
        <Footer />
      </ActiveSectionContextProvider>
    </div>
  );
}
