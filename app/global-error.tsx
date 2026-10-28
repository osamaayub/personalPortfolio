"use client";

import "./globals.css";
import StatusScreen, { primaryAction } from "@/components/status-screen";

// Replaces the root layout when it crashes, so it must render <html> and <body> itself.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas font-sans text-ink antialiased">
        <StatusScreen title="Something went wrong" message="The site hit an unexpected error. Please try again.">
          <button type="button" onClick={reset} className={primaryAction}>
            Try again
          </button>
        </StatusScreen>
      </body>
    </html>
  );
}
