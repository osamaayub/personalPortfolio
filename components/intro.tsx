"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/hooks/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

const Intro = () => {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] scroll-mt-[100rem] text-center sm:mb-0"
    >
      {/* Profile image */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <Image
              src="./personal.jpg"
              alt="Osama Ayub portrait"
              width={192}
              height={192}
              quality={95}
              priority
              className="h-24 w-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      {/* Headline */}
      <motion.h1
        className="mb-6 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Hi, I'm Osama.</span> A{" "}
        <span className="font-bold">Full-Stack Software Engineer</span> with{" "}
        <span className="font-bold">1+ year of experience</span> delivering
        production-ready applications at{" "}
        <span className="font-bold">SensViz</span>,{" "}
        <span className="font-bold">Cogilent Solutions</span>, and{" "}
        <span className="font-bold">IIFATECH</span>. I specialize in{" "}
        <span className="underline">React, Next.js & Node.js</span>, building
        scalable systems with clean TypeScript, optimized MongoDB queries, and
        responsive UIs that match design specs pixel-for-pixel.
      </motion.h1>

      {/* Mission statement */}
      <motion.p
        className="mb-8 px-6 text-lg text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        I thrive on building performant, user-friendly web apps that scale —
        from authentication flows to pixel-perfect UIs.
      </motion.p>

      {/* Key metrics strip */}
      <motion.div
        className="mb-8 flex flex-wrap items-center justify-center gap-4 px-4 text-sm text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          "⚡ Cut page refresh time by 30%",
          "📦 Reduced bundle size by 25%",
          "📈 Boosted session duration by 20%",
          "✅ Dropped post-release defects by 20%",
        ].map((stat) => (
          <span
            key={stat}
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white/70"
          >
            {stat}
          </span>
        ))}
      </motion.div>

      {/* Action bar */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Link
          href="mailto:osama.ayubwebdev@gmail.com"
          className="group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me
          <BsArrowRight className="opacity-70 transition group-hover:translate-x-1" />
        </Link>

        <Link
          href="/CV.pdf"
          download
          className="group flex cursor-pointer items-center gap-2 rounded-full borderBlack bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10"
        >
          Download CV
          <HiDownload className="opacity-60 transition group-hover:translate-y-1" />
        </Link>

        <Link
          href="https://www.linkedin.com/in/osama-ayub8889993755979/"
          target="_blank"
          className="flex items-center gap-2 rounded-full borderBlack bg-white p-4 text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60"
        >
          <BsLinkedin />
        </Link>

        <Link
          href="https://github.com/osamaayub"
          target="_blank"
          className="flex items-center gap-2 rounded-full borderBlack bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60"
        >
          <FaGithubSquare />
        </Link>
      </motion.div>
    </section>
  );
};

export default Intro;
