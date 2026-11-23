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

const Intro = ({ profile, chips = [] }: { profile: Profile; chips?: readonly string[] }) => {
  const reduceMotion = useReducedMotion();
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const primaryButton =
    "btn-shine flex h-14 items-center justify-center gap-2 rounded-full px-7 font-medium transition-colors duration-300";

  const socialButton =
    "flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand";

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
      className="relative mx-auto mb-20 flex min-h-[82svh] max-w-7xl flex-col items-center justify-center scroll-mt-28 px-4 text-center sm:mb-28 xl:items-start xl:pr-[36%] xl:text-left"
    >
      {/* Profile Image */}
      <div className="relative flex justify-center xl:absolute xl:right-4 xl:top-1/2 xl:w-[35%] xl:-translate-y-1/2">
        <m.div
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
        >
          <m.div
            className="profile-halo relative rounded-full p-1.5 xl:rounded-[2rem] xl:p-2"
            animate={reduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 4, ease: "easeInOut", repeat: Infinity }}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          >
            {/* Orbiting conic-gradient arc */}
            <div
              aria-hidden="true"
              className="animate-spin-slow absolute -inset-2.5 rounded-full opacity-70 blur-[3px] xl:-inset-3 xl:rounded-[2.2rem]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgb(var(--brand) / 0.65) 310deg, transparent 360deg)",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "2px",
              }}
            />
            <m.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.86, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.32 }}
            >
              <Image
                src="/personal.jpg"
                alt={profile.name}
                width={592}
                height={592}
                priority
                sizes="(min-width: 1152px) 438px, (min-width: 1024px) 38vw, 128px"
                className="h-32 w-32 rounded-full border-[5px] border-surface object-cover shadow-2xl xl:h-auto xl:w-full xl:aspect-square xl:rounded-[1.5rem]"
              />
            </m.div>
          </m.div>
        </m.div>

        {/* Floating skill chips (desktop only) */}
        {chips.length > 0 && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
            {[
              { pos: "-left-9 top-10", rotate: "-6deg" },
              { pos: "-right-7 top-1/4", rotate: "5deg" },
              { pos: "-left-5 bottom-12", rotate: "4deg" },
              { pos: "-right-5 bottom-24", rotate: "-5deg" },
            ].slice(0, chips.length).map((c, i) => (
              <m.span
                key={chips[i]}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.9 + i * 0.15 }}
                className={`absolute ${c.pos}`}
              >
                <span
                  className="animate-float block rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-semibold text-ink-muted shadow-card backdrop-blur"
                  style={{ rotate: c.rotate, animationDelay: `${i * 1.4}s` }}
                >
                  {chips[i]}
                </span>
              </m.span>
            ))}
          </div>
        )}
      </div>

      <m.p
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 backdrop-blur-sm dark:text-emerald-300 xl:mt-0"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {profile.availability}
      </m.p>

      {/* Heading */}
      <m.h1
        className="mt-8 max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-6xl xl:mt-6 xl:text-[4rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      >
        Hi, I'm{" "}
        <m.span
          className="font-bold text-brand"
          initial={false}
        >
          <span className="sr-only">{profile.name}</span>
          {profile.name.split(' ').map((word, index) => (
            <React.Fragment key={word}>
              {index > 0 && ' '}
              <m.span
                aria-hidden="true"
                className="animate-gradient inline-block bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-indigo-600 bg-clip-text font-bold text-transparent dark:from-indigo-300 dark:via-fuchsia-300 dark:to-indigo-300"
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
      </m.h1>

      <m.p
        className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed text-ink sm:text-2xl xl:mx-0"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        A {profile.title.toLowerCase()} turning complex ideas into{" "}
        <RotatingText
          words={[
            "polished websites",
            "reliable web products",
            "delightful digital experiences",
          ]}
        />
        .
      </m.p>

      <m.p
        className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8 xl:mx-0"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
      >
        I work across the stack, creating intuitive React interfaces and dependable
        APIs with a focus on clean code, performance, and the details that make
        products feel effortless.
      </m.p>

      {/* Buttons */}
      <m.div
        className="mt-10 flex flex-wrap items-center justify-center gap-3 xl:justify-start"
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
          className={`${primaryButton} group bg-ink text-canvas shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand`}
        >
          Contact Me
          <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </MotionLink>

        <MotionLink
          {...buttonMotion}
          href={profile.cvUrl}
          download
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-surface-2"
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
        className="mt-12 grid w-full max-w-2xl grid-cols-2 border-y border-line sm:grid-cols-4"
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
            className="px-4 py-4 sm:border-r sm:border-line sm:last:border-r-0"
          >
            <dd className="text-2xl font-semibold tracking-tight text-ink">
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