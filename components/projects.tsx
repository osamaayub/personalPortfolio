"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/data/data";
import Project from "./project";
import { useSectionInView } from "@/hooks/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="w-full max-w-6xl scroll-mt-28 mb-28">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">Selected work</p>
      <SectionHeading>Ideas turned into experiences</SectionHeading>
      <p className="mx-auto -mt-5 mb-12 max-w-xl text-center leading-relaxed text-gray-600 dark:text-gray-400">A collection of full-stack products, thoughtful interfaces, and real-world solutions. Explore the experience or dive into the code.</p>
      <div className="grid gap-7 md:grid-cols-2">
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
