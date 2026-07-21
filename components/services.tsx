"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { servicesData, workProcessSteps } from "@/data/data";
import { useSectionInView } from "@/hooks/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * index, duration: 0.45 },
  }),
};

const Services = () => {
  const { ref } = useSectionInView("Services");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      id="services"
      ref={ref}
      className="mb-28 w-full max-w-[53rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading
        subtitle={
          <>
            I partner with founders and teams to design, build, and improve web
            products—with a focus on{" "}
            <span className="font-medium text-gray-800 dark:text-white/90">
              clarity, performance, and maintainable code
            </span>
            .
          </>
        }
      >
        What I can help you with
      </SectionHeading>

      <div className="grid gap-5 sm:grid-cols-2">
        {servicesData.map((service, index) => {
          const isFeatured = "featured" in service && service.featured;

          return (
            <motion.article
              key={service.title}
              className={`group borderBlack relative overflow-hidden rounded-2xl bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md dark:bg-white/[0.07] ${
                isFeatured ? "sm:col-span-2 sm:p-8" : ""
              }`}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-40px" }}
              custom={index}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#fbe2e3]/80 to-[#dbd7fb]/60 opacity-60 blur-2xl transition-opacity group-hover:opacity-90 dark:from-[#946263]/40 dark:to-[#676394]/40"
                aria-hidden
              />

              <div
                className={`relative flex flex-col gap-4 ${
                  isFeatured ? "sm:flex-row sm:items-start sm:gap-8" : ""
                }`}
              >
                <span
                  className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-lg dark:from-white/20 dark:to-white/5 ${
                    isFeatured ? "h-14 w-14" : "h-12 w-12"
                  }`}
                >
                  <service.icon className={isFeatured ? "text-2xl" : "text-xl"} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white/95">
                      {service.title}
                    </h3>
                    {isFeatured ? (
                      <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white dark:bg-white/15">
                        Most requested
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-gray-700 dark:text-white/75">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/70"
                      >
                        <HiCheckCircle className="mt-0.5 shrink-0 text-lg text-gray-900 dark:text-white/80" />
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

      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-white/50">
          How I work
        </p>
        <ol className="grid gap-4 sm:grid-cols-3">
          {workProcessSteps.map((item) => (
            <li
              key={item.step}
              className="borderBlack relative rounded-2xl bg-white/80 p-5 text-left dark:bg-white/[0.06]"
            >
              <span className="text-3xl font-bold text-gray-200 dark:text-white/10">
                {item.step}
              </span>
              <h4 className="-mt-4 mb-2 text-base font-semibold text-gray-900 dark:text-white/90">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-white/70">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div
        className="borderBlack mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-10 text-center text-white shadow-xl dark:from-white/10 dark:via-white/[0.08] dark:to-white/5"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold sm:text-2xl">
          Ready to start your next project?
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-300 dark:text-white/70">
          Tell me about your idea, timeline, and stack—I&apos;ll reply with honest
          feedback and how we can work together.
        </p>
        <Link
          href="#contact"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 outline-none transition hover:scale-105 focus:scale-105 active:scale-100"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Get in touch
          <BsArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
};

export default Services;
