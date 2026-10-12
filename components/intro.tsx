"use client";

import Image from "next/image";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/hooks/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

const MotionLink = motion(Link);

const Intro = () => {
  const reduceMotion = useReducedMotion();
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const primaryButton =
    "flex h-14 items-center justify-center gap-2 rounded-full px-7 font-medium transition-colors duration-300";

  const socialButton =
    "flex h-14 w-14 items-center justify-center rounded-full borderBlack bg-white text-gray-700 shadow-sm transition-colors duration-300 hover:text-gray-950 dark:bg-white/10 dark:text-white/70";

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const buttonMotion = {
    variants: itemVariants,
    whileHover: reduceMotion ? undefined : { y: -4, scale: 1.04 },
    whileTap: reduceMotion ? undefined : { scale: 0.96 },
    transition: { type: "spring", stiffness: 320, damping: 20 },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="mx-auto mb-20 flex min-h-[90vh] max-w-4xl flex-col items-center justify-center scroll-mt-[100rem] px-4 text-center sm:mb-28"
    >
      {/* Profile Image */}
      <div className="flex justify-center">
        <motion.div
          className="profile-halo relative rounded-full p-2"
          initial={false}
          animate={reduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
          transition={{ duration: 4, ease: "easeInOut" }}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
          >
            <Image
              src="/personal.jpg"
              alt="Osama Ayub"
              width={128}
              height={128}
              priority
              className="h-32 w-32 rounded-full border-[5px] border-white object-cover shadow-2xl"
            />
          </motion.div>

          <motion.span
            className="absolute -bottom-1 -right-1 text-4xl"
            style={{ transformOrigin: "70% 70%" }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: reduceMotion ? 0 : [0, 20, -12, 20, -6, 0] }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 180,
              rotate: { type: "tween", duration: 1.6, delay: 0.4, ease: "easeInOut" },
            }}
          >
            👋
          </motion.span>
        </motion.div>
      </div>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 rounded-full border border-indigo-200/70 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200"
      >
        Thoughtful code. Meaningful experiences.
      </motion.p>

      {/* Heading */}
      <motion.h1
        className="mt-8 max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      >
        Hi, I'm{" "}
        <motion.span
          className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text font-bold text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-fuchsia-300"
          style={{ backgroundSize: "200% auto" }}
          initial={false}
          animate={{ backgroundPosition: reduceMotion ? "0% center" : ["100% center", "0% center"] }}
          transition={{ duration: reduceMotion ? 0 : 4, ease: "easeInOut" }}
        >
          <span className="sr-only">Osama Ayub</span>
          {['Osama', 'Ayub'].map((word, index) => (
            <React.Fragment key={word}>
              {index > 0 && ' '}
              <motion.span
                aria-hidden="true"
                className="inline-block bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-fuchsia-300"
                initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.25 + index * 0.12 }}
              >
                {word}
              </motion.span>
            </React.Fragment>
          ))}
        </motion.span>
        .
        <br />
        <span className="mt-6 inline-block max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 sm:text-2xl">
          Software Engineer at{" "}
          <span className="relative inline-block font-bold">
            Cogilent Solutions
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-400"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, delay: 0.8, ease: "easeOut" }}
            />
          </span>{" "}
          with 2+ years of experience specializing in React, Next.js, Node.js & TypeScript.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        From a first idea to a polished product, I build fast, intuitive web
        experiences backed by clean architecture and reliable systems.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } } }}
      >
        <MotionLink
          {...buttonMotion}
          href="#contact"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
          className={`${primaryButton} group bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700`}
        >
          Contact Me
          <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </MotionLink>

        <MotionLink
          {...buttonMotion}
          href="/CV.pdf"
          download
          className={`${primaryButton} border border-black/10 bg-white dark:border-white/10 dark:bg-white/10`}
        >
          Download CV
          <HiDownload className="text-lg" />
        </MotionLink>

        <MotionLink
          {...buttonMotion}
          href="https://www.linkedin.com/in/osama-ayub8889993755979/"
          target="_blank"
          rel="noopener noreferrer"
          className={socialButton}
          aria-label="LinkedIn"
        >
          <BsLinkedin size={22} />
        </MotionLink>

        <MotionLink
          {...buttonMotion}
          href="https://github.com/osamaayub"
          target="_blank"
          rel="noopener noreferrer"
          className={socialButton}
          aria-label="GitHub"
        >
          <FaGithubSquare size={24} />
        </MotionLink>
      </motion.div>

      {/* Small Stats */}
      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-gray-200/70 bg-white/60 px-6 py-5 text-sm text-gray-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {['💼 2+ Years Experience', '⚛ React & Next.js', '🟢 Node.js & Express', '🍃 MongoDB', '📍 Lahore, Pakistan'].map((stat) => (
          <motion.span
            key={stat}
            variants={itemVariants}
            whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            {stat}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default Intro;