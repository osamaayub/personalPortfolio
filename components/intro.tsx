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
  const { setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const primaryButton =
    "flex h-14 items-center justify-center gap-2 rounded-full px-7 font-medium transition-all duration-300 hover:scale-105 active:scale-95";

  const socialButton =
    "flex h-14 w-14 items-center justify-center rounded-full borderBlack bg-white text-gray-700 shadow-sm transition-all duration-300 hover:scale-110 hover:text-gray-950 dark:bg-white/10 dark:text-white/70";

  return (
    <section
      ref={ref}
      id="home"
      className="mx-auto flex min-h-[90vh] max-w-4xl flex-col items-center justify-center scroll-mt-[100rem] px-4 text-center"
    >
      {/* Profile Image */}
      <div className="flex justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/personal.jpg"
              alt="Osama Ayub"
              width={200}
              height={200}
              priority
              quality={100}
              className="h-32 w-32 rounded-full border-[5px] border-white object-cover shadow-2xl"
            />
          </motion.div>

          <motion.span
            className="absolute -bottom-1 -right-1 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 180,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      {/* Heading */}
      <motion.h1
        className="mt-8 max-w-4xl text-3xl font-medium leading-tight sm:text-5xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hi, I'm{" "}
        <span className="font-bold text-gray-900 dark:text-white">
          Osama Ayub
        </span>
        .
        <br />
        <span className="mt-2 inline-block">
          Software Engineer specializing in{" "}
          <span className="font-bold">
            React, Next.js, Node.js & TypeScript
          </span>
          .
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        I build scalable, high-performance web applications using the MERN
        stack. Passionate about creating clean architecture, intuitive user
        experiences, and reliable backend systems that solve real-world
        problems.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="#contact"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
          className={`${primaryButton} bg-gray-900 text-white hover:bg-black`}
        >
          Contact Me
          <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/CV.pdf"
          download
          className={`${primaryButton} border border-black/10 bg-white dark:border-white/10 dark:bg-white/10`}
        >
          Download CV
          <HiDownload className="text-lg" />
        </Link>

        <Link
          href="https://www.linkedin.com/in/osama-ayub8889993755979/"
          target="_blank"
          rel="noopener noreferrer"
          className={socialButton}
          aria-label="LinkedIn"
        >
          <BsLinkedin size={22} />
        </Link>

        <Link
          href="https://github.com/osamaayub"
          target="_blank"
          rel="noopener noreferrer"
          className={socialButton}
          aria-label="GitHub"
        >
          <FaGithubSquare size={24} />
        </Link>
      </motion.div>

      {/* Small Stats */}
      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        <span>💼 1+ Year Experience</span>
        <span>⚛ React & Next.js</span>
        <span>🟢 Node.js & Express</span>
        <span>🍃 MongoDB</span>
        <span>📍 Islamabad, Pakistan</span>
      </motion.div>
    </section>
  );
};

export default Intro;