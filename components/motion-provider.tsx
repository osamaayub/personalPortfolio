"use client";

import React, { useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { HiArrowUp } from "react-icons/hi";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

const RADIUS = 19;

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => setVisible(v > 0.015));

  return (
    <LazyMotion features={loadFeatures}>
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <m.button
            type="button"
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
            }
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="fixed bottom-6 right-6 z-[999] hidden h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-muted shadow-card backdrop-blur-md transition-colors hover:border-brand/40 hover:text-brand hover:shadow-card-hover lg:flex"
          >
            <svg viewBox="0 0 48 48" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="24"
                cy="24"
                r={RADIUS}
                fill="none"
                stroke="rgb(var(--line))"
                strokeWidth="2"
              />
              <m.circle
                cx="24"
                cy="24"
                r={RADIUS}
                fill="none"
                stroke="rgb(var(--brand))"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: reduceMotion ? scrollYProgress : progress }}
              />
            </svg>
            <span className="relative">
              <HiArrowUp className="text-base" />
            </span>
          </m.button>
        )}
      </AnimatePresence>
      {children}
    </MotionConfig>
    </LazyMotion>
  );
}
