"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/hooks/hooks";

const About = () => {
  const { ref } = useSectionInView("About");
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] scroll-mt-28 rounded-3xl border border-indigo-100/80 bg-white/60 px-6 py-10 text-center leading-8 shadow-xl shadow-indigo-950/5 backdrop-blur-sm sm:mb-40 sm:px-10 dark:border-white/10 dark:bg-white/5"
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>

      <p className="mb-3">
        I’m a <span className="font-medium">Full-Stack Software Engineer</span>{" "}
        with <span className="font-medium">2+ years of professional experience</span>{" "}
        building scalable web applications. I specialize in the MERN stack,
        Next.js, and TypeScript, with a focus on performance, clean code, and
        intuitive user experiences.
      </p>

      <p className="mb-3">
        At{" "}
        <span className="font-medium">
          Cogilent Solutions, SensViz, and Narsun Studios
        </span>
        , I’ve built REST APIs, secure authentication, and responsive interfaces
        for enterprise applications and AI-powered platforms. I enjoy turning
        complex problems into practical solutions.
      </p>

      <p>
        Outside of coding, I enjoy gaming, movies, and time with friends—along
        with <span className="font-medium">learning new technologies</span>.
      </p>
    </motion.section>
  );
};

export default About;
