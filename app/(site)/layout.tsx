import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackdrop from "@/components/animated-backdrop";
import SpotlightEffect from "@/components/spotlight-effect";
import { getContent } from "@/lib/content";
import ActiveSectionContextProvider from "@/context/active-section-context";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile, sections } = await getContent();

  return (
    <div className="relative pt-28 sm:pt-36">
      <AnimatedBackdrop />
      <SpotlightEffect />
      <ActiveSectionContextProvider>
        <Header name={profile.name} />
        {children}
        <Footer name={profile.name} text={sections.footer.text} />
      </ActiveSectionContextProvider>
    </div>
  );
}
