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
import { m } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";

const Services = ({ content, copy }: { content: ServicesContent; copy: SectionsContent["services"] }) => {
  const { ref } = useSectionInView("Services");
  const { setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="services"
      className="mb-28 w-full max-w-[72rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading
        eyebrow={copy.eyebrow}
        subtitle={content.intro}
      >
        {copy.title}
      </SectionHeading>

      {/* Upwork banner: full-stack + AI integration */}
      <m.aside
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-[#1d1e22] p-6 text-white shadow-card sm:p-8 lg:mb-12"
      >
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Upwork · Full-Stack + AI Integration
            </span>

            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
              Web apps that think with AI
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/70">
              End-to-end product development — pixel-perfect React interfaces,
              robust Node/Express APIs, and production AI features: GPT &amp;
              Gemini integrations, RAG pipelines, chatbots, and workflow
              automation.
            </p>

            <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {[
                "LLM API integration (OpenAI, Gemini)",
                "RAG & vector search pipelines",
                "AI chatbots & copilots",
                "Workflow & task automation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-base text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
              className="btn-shine group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-violet-600 hover:text-white"
            >
              Start your AI project
              <BsArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* AI code-window visual */}
          <div aria-hidden="true" className="relative hidden lg:block">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 font-mono text-[13px] leading-6 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex gap-1.5 border-b border-white/10 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <p>
                <span className="text-fuchsia-300">const</span>{" "}
                <span className="text-sky-300">answer</span>{" "}
                <span className="text-white/60">=</span>{" "}
                <span className="text-emerald-300">await</span>{" "}
                <span className="text-violet-300">ai</span>
                <span className="text-white/60">.</span>
                <span className="text-amber-200">generate</span>
                <span className="text-white/60">({"{"} prompt, context {"}"})</span>
              </p>
              <p className="mt-1.5 text-white/40">// RAG pipeline · GPT-4o · Gemini</p>
              <p className="mt-1.5">
                <span className="text-fuchsia-300">return</span>{" "}
                <span className="text-emerald-300">{"{ answer, citations }"}</span>
              </p>
            </div>
            <span className="animate-float absolute -bottom-4 -left-4 rounded-full border border-white/15 bg-[#2a2c36] px-3.5 py-1.5 text-xs font-semibold text-white/85 shadow-xl">
              GPT-4o · Gemini · Vector DB
            </span>
          </div>
        </div>
      </m.aside>

      <div className="grid gap-5 sm:grid-cols-2">
        {content.items.map((service, index) => {
          const Icon = serviceIcons[service.icon];

          return (
            <m.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-105">
                  <Icon className="text-lg" />
                </div>
                <span className="font-mono text-xs font-semibold text-ink-subtle transition-colors group-hover:text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-7 text-ink-muted">
                {service.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {service.highlights.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </m.article>
          );
        })}
      </div>

      {/* CTA */}

      <m.div
        className="mt-14 rounded-[1.75rem] border border-line bg-surface-2 px-6 py-10 text-center text-ink sm:px-8 sm:py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold">
          {copy.ctaTitle}
        </h3>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink-muted">
          {copy.ctaText}
        </p>

        <Link
          href="#contact"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
          className="btn-shine group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-semibold text-canvas transition-colors hover:bg-brand"
        >
          {copy.ctaButton}
          <BsArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </m.div>
    </section>
  );
};

export default Services;