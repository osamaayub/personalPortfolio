"use client";

import React from "react";
import { m } from "framer-motion";

export default function SectionDivider() {
  return (
    <m.div
      className="my-24 hidden h-16 w-1 rounded-full bg-line sm:block"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
    ></m.div>
  );
}
