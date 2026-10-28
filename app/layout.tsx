import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import MotionProvider from "@/components/motion-provider";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const { profile, skills } = await getContent();
  const title = `${profile.name} | ${profile.title}`;
  const description = `${profile.title}${profile.company ? ` at ${profile.company}` : ""} ${profile.tagline}`.trim();
  const keywords = [
    profile.name,
    profile.title,
    "portfolio",
    ...profile.roles,
    ...skills.flatMap((g) => g.skills).slice(0, 15),
  ];

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${profile.name}` },
    description,
    applicationName: `${profile.name} Portfolio`,
    keywords,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    alternates: { canonical: "/" },
    openGraph: { title, description, type: "website", url: "/", siteName: profile.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090b11" },
  ],
  colorScheme: "light dark",
};

// Runs before first paint so dark-mode visitors never see a light flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        url: siteUrl,
        email: `mailto:${profile.email}`,
        address: profile.location,
        sameAs: [profile.linkedin, profile.github].filter(Boolean),
        ...(profile.company ? { worksFor: { "@type": "Organization", name: profile.company } } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profile.name} Portfolio`,
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} !scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          // "<" is escaped so profile text can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
        />
      </head>
      <body className="relative bg-canvas font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only z-[1001] rounded-lg bg-surface px-4 py-2 font-medium text-ink shadow-card focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ThemeContextProvider>
          <MotionProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "rgb(var(--surface))",
                  color: "rgb(var(--ink))",
                  border: "1px solid rgb(var(--line))",
                },
              }}
            />
          </MotionProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
