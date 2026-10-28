"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { FaDatabase, FaMobileAlt, FaReact, FaServer, FaCode } from "react-icons/fa";
import type { SectionsContent, ServicesContent } from "@/lib/content-schema";

const serviceIcons = {
  react: FaReact,
  server: FaServer,
  mobile: FaMobileAlt,
  database: FaDatabase,
  code: FaCode,
} as const;
import { useSectionInView } from "@/hooks/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";

const cardVariants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.45,
    },
  }),
};

const Services = ({ content, copy }: { content: ServicesContent; copy: SectionsContent["services"] }) => {
  const { ref } = useSectionInView("Services");
  const { setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="services"
      className="mb-28 w-full max-w-[64rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading
        eyebrow={copy.eyebrow}
        subtitle={content.intro}
      >
        {copy.title}
      </SectionHeading>



      <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">
        {content.items.map((service, index) => {
          const isFeatured = false;
          const Icon = serviceIcons[service.icon];

          return (
            <motion.article
              key={service.title}
              variants={cardVariants}
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -5 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 28,
              }}
              className={`spotlight group relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm transition-shadow hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 lg:p-8 dark:border-white/10 dark:bg-slate-900/80 ${isFeatured ? "sm:col-span-2 sm:p-8" : ""
                }`}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#fbe2e3]/80 to-[#dbd7fb]/60 opacity-60 blur-2xl transition-opacity group-hover:opacity-90 dark:from-[#946263]/40 dark:to-[#676394]/40"
                aria-hidden
              />
              <span aria-hidden="true" className="pointer-events-none absolute right-6 top-4 select-none text-6xl font-black text-indigo-500/10 dark:text-white/5">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div
                className={`relative flex flex-col gap-4 ${isFeatured
                  ? "sm:flex-row sm:items-start sm:gap-8"
                  : ""
                  }`}
              >
                <div
                  className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20 transition-transform motion-safe:group-hover:-rotate-6 ${isFeatured ? "h-14 w-14" : "h-12 w-12"
                    }`}
                >
                  <Icon
                    className={isFeatured ? "text-2xl" : "text-xl"}
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>

                    {/* {isFeatured && (
                      <span className="rounded-full bg-gray-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white dark:bg-white/10">
                        Most Requested
                      </span>
                    )} */}
                  </div>

                  <p className="text-[15px] leading-7 text-gray-700 dark:text-white/70">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/70"
                      >
                        <HiCheckCircle className="mt-0.5 shrink-0 text-lg text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* CTA */}

      <motion.div
        className="borderBlack mt-14 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black px-8 py-12 text-center text-white shadow-2xl dark:from-white/10 dark:via-white/[0.08] dark:to-white/5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold">
          {copy.ctaTitle}
        </h3>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300 dark:text-white/70">
          {copy.ctaText}
        </p>

        <Link
          href="#contact"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-100 active:scale-95"
        >
          {copy.ctaButton}
          <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
};

export default Services;