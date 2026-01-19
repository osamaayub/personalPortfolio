import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import Twitter from '@/public/Twitter.png';
import portfolio from '@/public/3dportfolio.png';
import JobLane from "@/public/jobLane.png";


export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const experiencesData = [
  {
    title: 'Junior Software Engineer',
    location: 'SensViz Lahore, Pk',
    description: "I’m a Junior Software Engineer and aspiring Full-Stack Developer with hands-on experience in the MERN stack. I build responsive, performance-driven web applications with clean UI and maintainable backend logic. I’m passionate about learning, writing readable code, and applying best practices to deliver reliable software solutions.",
    date: 'AUG 2025 - present',

  },
  {
    title: 'MernStack bootcamp',
    location: 'Lahore, Pk',
    description:
      'I graduated after 6 months of studying. I immediately found an internship  as a front-end developer.',
    icon: React.createElement(LuGraduationCap),
    date: 'June 2023 - Sep 2023',
  },
  {
    title: 'MERNSTACK Developer',
    location: 'Narsun Studios,Lahore',
    description:
      'I worked as a fullstack developer for 6 months  in 1 job. I also upskilled to the full stack.',
    icon: React.createElement(CgWorkAlt),
    date: 'Jan 2024 - Apr 2024',
  },
  {
    title: 'Full-Stack Developer',
    location: 'IIFATECH,Lahore',
    description:
      "I'm now a full-stack developer working at iifatech. My stack includes React, TypeScript, Tailwind and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: 'Aug 2024 - Oct 2024',
  },
] as const;

export const projectsData = [
  {
    title: 'Twitter Clone',
    description:
      'It was a clone of the Twitter website built using Bootstrap. Fully responsive and developed during my internship at Narsun Studios.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
    imageUrl: Twitter,
    url: 'https://osamaayub.github.io/TwitterClone/',
    github: 'https://github.com/osamaayub/TwitterClone',
  },
  {
    title: 'Portfolio',
    description:
      'Portfolio website built using Three.js and Framer Motion to showcase my work interactively.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Three.js', 'Framer Motion'],
    imageUrl: portfolio,
    url: 'https://osamaayubportfoliowebsite.netlify.app/',
    github: 'https://github.com/osamaayub/3D-Developer-Portfolio',
  },
  {
    title: 'JobLane',
    description:
      'JobLane is a job portal built with the MERN stack. Job seekers can browse and apply for jobs, and employers can post openings and manage applications.',
    tags: ['React', 'Node', 'Express', 'Tailwind', 'MongoDB'],
    imageUrl: JobLane,
    url: '', // Add live link if you deploy it
    github: 'https://github.com/osamaayub/JobLane',
  },
] as const;


export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Git',
  'Tailwind',
  'MongoDB',
  'Redux',
  'Express',
  'Framer Motion',
] as const;
