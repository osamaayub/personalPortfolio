import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import MotionProvider from "@/components/motion-provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const description =
  "Full-stack software engineer specializing in React, Next.js, Node.js and MongoDB. Available for web development, APIs, and product builds.";

export const metadata: Metadata = {
  title: {
    default: "Osama Ayub | Full-Stack Software Engineer",
    template: "%s | Osama Ayub",
  },
  description,
  openGraph: {
    title: "Osama Ayub | Full-Stack Software Engineer",
    description,
    type: "website",
  },
  twitter: { card: "summary", title: "Osama Ayub | Full-Stack Software Engineer", description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

// Runs before first paint so dark-mode visitors never see a light flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.className} relative bg-gray-50 text-gray-950 antialiased dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <ThemeContextProvider>
          <MotionProvider>
            {children}
            <Toaster position="top-right" />
          </MotionProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
