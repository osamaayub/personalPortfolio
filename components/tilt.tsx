"use client";

import React from "react";
import { m, useReducedMotion, useSpring } from "framer-motion";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
};

/** 3D pointer tilt wrapper — cards lean toward the cursor on desktop. */
export default function Tilt({ children, className }: TiltProps) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24 });

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.div
      className={className}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
      }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        rotateX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 6);
        rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </m.div>
  );
}
