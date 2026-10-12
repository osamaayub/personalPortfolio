import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import MotionProvider from "@/components/motion-provider";
import AnimatedBackdrop from "@/components/animated-backdrop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Osama Ayub | Personal Portfolio",
  description:
    "Full-stack software engineer specializing in React, Next.js, and Node.js. Available for web development, APIs, and product builds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <ThemeContextProvider>
          <MotionProvider>
            <AnimatedBackdrop />
            <ActiveSectionContextProvider>
              <Header />
              {children}
              <Footer />

              <Toaster position="top-right" />
              <ThemeSwitch />
            </ActiveSectionContextProvider>
          </MotionProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
