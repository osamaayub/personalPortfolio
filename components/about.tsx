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
      <SectionHeading>About me</SectionHeading>

      <p className="mb-3">
        I’m a <span className="font-medium">Junior Software Engineer</span> with{" "}
        <span className="font-medium">6 months of hands-on industry experience</span>{" "}
        building and maintaining modern web applications. I specialize in{" "}
        <span className="font-medium">MERN stack development</span> and enjoy
        creating scalable, maintainable, and user-focused solutions.
      </p>

      <p className="mb-3">
        My core stack includes{" "}
        <span className="font-medium">
          React, Next.js, Node.js, MongoDB, and TypeScript
        </span>
        . I have experience working with REST APIs, Redux, authentication flows,
        reusable components, and backend business logic.{" "}
        <span className="italic">
          Problem-solving and improving existing systems
        </span>{" "}
        are the aspects of development I enjoy the most.
      </p>

      <p>
        When I’m not coding, I enjoy playing video games, watching movies, and
        spending time with friends. I also enjoy{" "}
        <span className="font-medium">learning new technologies</span> and
        continuously improving my skills as a full-stack developer.
      </p>
    </motion.section>
  );
};

export default About;
