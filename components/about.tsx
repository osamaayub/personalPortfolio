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
          SensViz, Cogilent Solutions, and IIFATECH
        </span>
        , I have contributed to projects involving dashboard development,
        role-based access control, data management systems, performance
        optimization, and full-stack application development within Agile
        environments. I am passionate about writing clean, testable code and
        continuously improving both product quality and development processes.
      </p>

      <p>
        When I’m not coding, I enjoy playing video games, watching movies, and
        spending time with friends. I also enjoy{" "}
        <span className="font-medium">learning new technologies</span> and
        staying up to date with modern web development trends to grow as a
        software engineer and build impactful digital products.
      </p>
    </motion.section>
  );
};

export default About;
