"use client";

import React from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/hooks/hooks";
import type { PublicProject } from "@/lib/types";

export default function Projects({ projects }: { projects: PublicProject[] }) {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="mb-28 w-full max-w-6xl scroll-mt-28">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">
        Selected work
      </p>
      <SectionHeading>Ideas turned into experiences</SectionHeading>
      <p className="mx-auto -mt-5 mb-12 max-w-xl text-center leading-relaxed text-gray-600 dark:text-gray-400">
        A collection of full-stack products, thoughtful interfaces, and real-world solutions. Explore the
        experience or dive into the code.
      </p>

      <div className="grid gap-7 md:grid-cols-2">
        {projects.map((project) => (
          <Project key={project.id} {...project} wide={project.featured} />
        ))}
      </div>
    </section>
  );
}
