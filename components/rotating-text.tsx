"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function RotatingText({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion, words.length]);

  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="animate-gradient bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-indigo-600 bg-clip-text font-semibold text-transparent dark:from-indigo-300 dark:via-fuchsia-300 dark:to-indigo-300"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
