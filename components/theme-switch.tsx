"use client";

import { useTheme } from "@/context/theme-context";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch({ inline = false }: { inline?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={toggleTheme}
      className={clsx(
        "flex items-center justify-center transition-all",
        inline
          ? "h-10 w-10 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
          : "fixed bottom-5 right-5 h-[3rem] w-[3rem] rounded-full border border-white border-opacity-40 bg-white bg-opacity-80 shadow-2xl backdrop-blur-[0.5rem] hover:scale-[1.15] active:scale-105 dark:bg-gray-950",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          className="flex"
        >
          {theme === "light" ? <BsSun /> : <BsMoon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
