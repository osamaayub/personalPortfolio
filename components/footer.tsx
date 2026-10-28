import React from "react";
import { links } from "@/data/data";

const Footer = ({ name, text }: { name: string; text: string }) => {
  return (
    <footer className="mx-auto mb-10 mt-8 max-w-3xl border-t border-gray-200 px-4 pt-8 text-center text-gray-500 dark:border-white/10">
      <nav aria-label="Footer" className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        {links.map((l) => (
          <a key={l.hash} href={l.hash} className="transition hover:text-gray-900 dark:hover:text-white">
            {l.name}
          </a>
        ))}
      </nav>
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} {name}. All rights reserved.
      </small>
      <p className="text-xs">{text}</p>
    </footer>
  );
};
export default Footer;
