"use client";

import React from "react";
import { LazyMotion, MotionConfig, m, useReducedMotion, useScroll, useSpring } from "framer-motion";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  return (
    <LazyMotion features={loadFeatures}>
    <MotionConfig reducedMotion="user">
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-1 origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-400"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
      />
      {children}
    </MotionConfig>
    </LazyMotion>
  );
}