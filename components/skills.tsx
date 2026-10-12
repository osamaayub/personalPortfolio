"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/data/data";
import { useSectionInView } from "@/hooks/hooks";
import { motion, useReducedMotion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.035 * index,
    },
  }),
};

 const Skills=()=> {
  const { ref } = useSectionInView("Skills");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
      <p className="mx-auto -mt-4 mb-8 max-w-lg leading-relaxed text-gray-600 dark:text-gray-400">The tools I use to turn complex problems into simple, dependable experiences.</p>
      <ul className="flex flex-wrap justify-center gap-3 text-base text-gray-800">
        {skillsData.map((skill, index) => (
          <motion.li
            className="rounded-2xl border border-indigo-100 bg-white/80 px-5 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80"
            key={index}
            variants={fadeInAnimationVariants}
            initial={reduceMotion ? false : "initial"}
            whileInView="animate"
            whileHover={reduceMotion ? undefined : { y: -4, rotate: -2, borderColor: "#818cf8", boxShadow: "0 8px 24px rgb(99 102 241 / 0.12)" }}
            viewport={{
              once: true,
            }}
            custom={reduceMotion ? 0 : index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;