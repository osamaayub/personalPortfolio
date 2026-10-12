"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="portfolio-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-[65rem] overflow-hidden">
      <motion.div
        initial={false}
        animate={reduceMotion ? { x: 0, y: 0, scale: 1 } : { x: [-20, 20], y: [-15, 15], scale: [0.95, 1.05] }}
        transition={{ duration: reduceMotion ? 0 : 4, ease: "easeInOut" }}
        className="absolute -top-24 right-[-10%] h-[32rem] w-[40rem] rounded-full bg-violet-200/60 blur-[90px] dark:bg-violet-900/25"
      />
      <motion.div
        initial={false}
        animate={reduceMotion ? { x: 0, y: 0, scale: 1 } : { x: [20, -20], y: [15, -15], scale: [1.05, 0.95] }}
        transition={{ duration: reduceMotion ? 0 : 4, ease: "easeInOut" }}
        className="absolute top-32 left-[-15%] h-[30rem] w-[40rem] rounded-full bg-indigo-200/60 blur-[90px] dark:bg-indigo-900/30"
      />
    </div>
  );
}