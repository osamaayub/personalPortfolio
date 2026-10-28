"use client";

import React from "react";
import SectionHeading from "./section-heading";
import Marquee from "./marquee";
import { useSectionInView } from "@/hooks/hooks";
import { m, useReducedMotion } from "framer-motion";
import type { SectionsContent, SkillGroup } from "@/lib/content-schema";

const Skills = ({ groups, copy }: { groups: SkillGroup[]; copy: SectionsContent["skills"] }) => {
  const { ref } = useSectionInView("Skills");
  const reduceMotion = useReducedMotion();

  const allSkills = groups.flatMap((g) => g.skills);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <section id="skills" ref={ref} className="mb-28 w-full max-w-[72rem] scroll-mt-28 sm:mb-40">
      <SectionHeading eyebrow={copy.eyebrow} subtitle={copy.subtitle}>
        {copy.title}
      </SectionHeading>

      {allSkills.length > 0 && (
        <div className="mb-10 space-y-3">
          <Marquee items={allSkills.slice(0, half)} />
          <Marquee items={allSkills.slice(half)} reverse />
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => (
          <m.div
            key={group.title}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
            className="spotlight card-interactive relative p-6 hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <p className="mb-4 text-sm text-ink-subtle">{group.blurb}</p>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="chip px-3 py-1.5 text-sm transition-colors hover:border-brand/40 hover:bg-brand/15"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
