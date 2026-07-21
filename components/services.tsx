"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { servicesData } from "@/data/data";
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

const Services = () => {
  const { ref } = useSectionInView("Services");
  const { setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="services"
      className="mb-28 w-full max-w-[53rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading
        subtitle={
          <>
            With 1 year of professional experience, I bring{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              strong full‑stack skills
            </span>{" "}
            in React, Next.js, Node.js, and MongoDB. I've contributed to{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              production-ready applications
            </span> at SensViz, Cogilent Solutions, and IIFATECH —
            improving performance, user experience, and maintainability.
            Here’s how I can add value to your team:
          </>
        }
      >
        Services
      </SectionHeading>



      <div className="grid gap-5 sm:grid-cols-2">
        {servicesData.map((service, index) => {
          const isFeatured =
            "featured" in service && service.featured;

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
              className={`group borderBlack relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:bg-white/[0.07] ${isFeatured ? "sm:col-span-2 sm:p-8" : ""
                }`}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#fbe2e3]/80 to-[#dbd7fb]/60 opacity-60 blur-2xl transition-opacity group-hover:opacity-90 dark:from-[#946263]/40 dark:to-[#676394]/40"
                aria-hidden
              />

              <div
                className={`relative flex flex-col gap-4 ${isFeatured
                  ? "sm:flex-row sm:items-start sm:gap-8"
                  : ""
                  }`}
              >
                <div
                  className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-lg dark:from-white/20 dark:to-white/5 ${isFeatured ? "h-14 w-14" : "h-12 w-12"
                    }`}
                >
                  <service.icon
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
          Let's Build Something Great Together
        </h3>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300 dark:text-white/70">
          Have an idea, startup, or business project in mind? I'm always
          excited to collaborate on building modern, scalable web applications
          that deliver real value. Let's discuss your goals and turn your vision
          into reality.
        </p>

        <Link
          href="#contact"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-100 active:scale-95"
        >
          Start a Conversation
          <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
};

export default Services;