"use client";

import Image from "next/image";
import React from "react";
import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/hooks/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import RotatingText from "./rotating-text";
import type { Profile } from "@/lib/content-schema";

const MotionLink = m.create(Link);

const Intro = ({ profile }: { profile: Profile }) => {
  const reduceMotion = useReducedMotion();
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const primaryButton =
    "flex h-14 items-center justify-center gap-2 rounded-full px-7 font-medium transition-colors duration-300";

  const socialButton =
    "flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface text-ink-muted shadow-card transition-colors duration-300 hover:text-ink";

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
        <m.div
          className="profile-halo relative rounded-full p-2"
          initial={false}
          animate={reduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 4, ease: "easeInOut", repeat: Infinity }}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        >
          <m.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
          >
            <Image
              src="/personal.jpg"
              alt={profile.name}
              width={128}
              height={128}
              priority
              className="h-32 w-32 rounded-full border-[5px] border-surface object-cover shadow-2xl"
            />
          </m.div>

          <m.span
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
          </m.span>
        </m.div>
      </div>

      <m.p
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 backdrop-blur-sm dark:text-emerald-300"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {profile.availability}
      </m.p>

      {/* Heading */}
      <m.h1
        className="mt-8 max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      >
        Hi, I'm{" "}
        <m.span
          className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text font-bold text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-purple-300"
          style={{ backgroundSize: "200% auto" }}
          initial={false}
          animate={{ backgroundPosition: reduceMotion ? "0% center" : ["100% center", "0% center"] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" as const }}
        >
          <span className="sr-only">{profile.name}</span>
          {profile.name.split(' ').map((word, index) => (
            <React.Fragment key={word}>
              {index > 0 && ' '}
              <m.span
                aria-hidden="true"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-purple-300"
                initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.25 + index * 0.12 }}
              >
                {word}
              </m.span>
            </React.Fragment>
          ))}
        </m.span>
        .
        <br />
        <span className="mt-6 inline-block max-w-2xl text-xl leading-relaxed text-ink-muted sm:text-2xl">
          {profile.title}
          {profile.company && (
            <>
              {" "}at{" "}
              <span className="relative inline-block font-bold">
                {profile.company}
                <m.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-400"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.65, delay: 0.8, ease: "easeOut" }}
                />
              </span>
            </>
          )}{" "}
          {profile.tagline}
        </span>
      </m.h1>

      {/* Rotating value line */}
      <m.p
        className="mt-6 text-xl font-medium text-ink sm:text-2xl"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
      >
        I build{" "}
        <RotatingText words={profile.roles} />
      </m.p>

      {/* Subtitle */}
      <m.p
        className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-ink-muted"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        From a first idea to a polished product, I build fast, intuitive web
        experiences backed by clean architecture and reliable systems.
      </m.p>

      {/* Buttons */}
      <m.div
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
          className={`${primaryButton} group bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400`}
        >
          Contact Me
          <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </MotionLink>

        <MotionLink
          {...buttonMotion}
          href={profile.cvUrl}
          download
          className={`${primaryButton} border border-line bg-surface text-ink shadow-card`}
        >
          Download CV
          <HiDownload className="text-lg" />
        </MotionLink>

        <MotionLink
          {...buttonMotion}
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={socialButton}
          aria-label="LinkedIn"
        >
          <BsLinkedin size={22} />
        </MotionLink>

        <MotionLink
          {...buttonMotion}
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className={socialButton}
          aria-label="GitHub"
        >
          <FaGithubSquare size={24} />
        </MotionLink>
      </m.div>

      {/* Stats */}
      <m.dl
        className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {profile.stats.map((stat) => (
          <m.div
            key={stat.label}
            variants={itemVariants}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="rounded-2xl border border-line bg-surface/70 px-4 py-4 shadow-card backdrop-blur-sm"
          >
            <dd className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-300 dark:to-purple-300">
              {stat.value}
            </dd>
            <dt className="mt-1 text-xs text-ink-muted">{stat.label}</dt>
          </m.div>
        ))}
      </m.dl>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="mt-14 hidden h-10 w-6 items-start justify-center rounded-full border-2 border-ink-subtle/50 p-1.5 sm:flex"
      >
        <m.span
          aria-hidden="true"
          className="h-2 w-1 rounded-full bg-ink-subtle"
          animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </a>
    </section>
  );
};

export default Intro;