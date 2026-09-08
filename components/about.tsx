"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/hooks";

const About = () => {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>

      <p className="mb-3">
        I’m a <span className="font-medium">Full-Stack Software Engineer</span>{" "}
        with <span className="font-medium">1+ year of professional experience</span>{" "}
        building scalable web applications using modern JavaScript technologies.
        I have worked across startups and product-focused teams, delivering
        production-ready applications that improve performance, user experience,
        and business workflows.
      </p>

      <p className="mb-3">
        My core expertise lies in{" "}
        <span className="font-medium">
          React.js, Next.js, Node.js, TypeScript, Express.js, and MongoDB
        </span>
        . I have hands-on experience designing REST APIs, implementing secure
        authentication systems, optimizing application performance, and building
        reusable, maintainable components. I enjoy solving complex problems and
        creating efficient solutions that provide real value to users.
      </p>

      <p className="mb-3">
        Throughout my experience at{" "}
        <span className="font-medium">
          Cogilent Solutions, SensViz, and Narsun Studios
        </span>
        , I have contributed to projects involving full-stack web development,
        REST API design, database architecture, and responsive user interfaces.
        I've worked on enterprise-level applications, management systems, and
        AI-powered platforms, delivering high-quality solutions that meet
        business requirements and user needs.
      </p>

      <p>
        When I’m not coding, I enjoy playing video games, watching movies, and
        spending time with friends. I also enjoy{" "}
        <span className="font-medium">continuous learning</span> and
        staying current with modern web development trends to grow as a
        software engineer and build impactful digital products.
      </p>
    </motion.section>
  );
};

export default About;
