"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/data/data";
import { useSectionInView } from "@/hooks/hooks";

const Experience = () => {
  const { ref } = useSectionInView("Experience");
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" ref={ref} className="mb-28 w-full max-w-[56rem] scroll-mt-28 sm:mb-40">
      <SectionHeading eyebrow="Career">My experience</SectionHeading>

      <div ref={listRef} className="relative">
        {/* Track, plus a gradient line that draws itself as you scroll. */}
        <div aria-hidden="true" className="absolute left-5 top-0 h-full w-px bg-gray-200 md:left-1/2 dark:bg-white/10" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reduceMotion ? 1 : lineScale }}
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-indigo-500 via-violet-500 to-fuchsia-500 md:left-1/2"
        />

        <ol className="space-y-10">
          {experiencesData.map((item, index) => {
            const onRight = index % 2 === 1;
            return (
              <li key={item.title + item.date} className="relative pl-14 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <div
                  className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-indigo-400 bg-white shadow-lg shadow-indigo-500/20 md:left-1/2 md:-translate-x-1/2 dark:bg-slate-900"
                >
                  <Image
                    src={item.logo}
                    alt={`${item.location.split(",")[0]} logo`}
                    width={32}
                    height={32}
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                <motion.article
                  initial={reduceMotion ? false : { opacity: 0, x: onRight ? 48 : -48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className={`spotlight relative rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-slate-900/80 ${
                    onRight ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                  }`}
                >
                  <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">
                    {item.date}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.location}</p>
                  <p className="mt-3 text-[15px] leading-7 text-gray-700 dark:text-white/70">{item.description}</p>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
