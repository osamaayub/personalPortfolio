import { CgWorkAlt } from 'react-icons/cg';
import {
  FaDatabase,
  FaMobileAlt,
  FaReact,
  FaServer,
} from 'react-icons/fa';
import portfolio from '@/public/3dportfolio.png';
import PrepWise from "@/public/PrepWise.png";
import Favicon from "@/public/Equigenix.png";
import Sensviz from '@/public/sensviz.jpeg';
import Narsun from "@/public/Narsun.jpeg";
import HLMS from "@/public/HLMS.png";
import Cogilent from '../public/cogilent.png';
export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'About', hash: '#about' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Skills', hash: '#skills' },
  { name: 'Services', hash: '#services' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Contact', hash: '#contact' },
] as const;

export const experiencesData = [
  {
    title: 'Software Engineer',
    location: 'Cogilent Solutions, Islamabad, PK',
    description:
        'Full-stack development focusing on scalable web applications. Worked on enterprise-level projects using React, Node.js, and modern JavaScript frameworks. Contributed to system architecture, API development, and performance optimization. Collaborated with cross-functional teams to deliver high-quality software solutions that meet business requirements and user needs.',
    date: 'Feb 2025 - Jan 2026',
    icon: CgWorkAlt,
    logo: Cogilent,
  },
  {
    title: 'Associate Software Engineer',
    location: 'SensViz, Lahore, PK',
    description:
        'Built and maintained full-stack web products on the MERN stack. Delivered REST APIs, MongoDB data models, and responsive React interfaces. Collaborated on production features with attention to performance, code quality, and clear UI/UX. Worked in an agile environment to deliver features on time and meet project milestones.',
    date: 'Aug 2025 - Jul 2026',
    icon: CgWorkAlt,
    logo: Sensviz,
  },
  {
    title: 'MERN Stack Developer',
    location: 'Narsun Studios, Lahore, PK',
    description:
        'Worked across the stack on web applications using React, Node.js, Express, and MongoDB. Gained solid full-stack delivery experience in an agile team environment, developing complete features from database design to frontend implementation. Contributed to project planning and code reviews while learning industry best practices.',
    date: 'Jan 2024 - Apr 2024',
    icon: CgWorkAlt,
    logo: Narsun,
  },
] as const;

export const servicesData = [
  {
    title: 'Frontend development',
    description:
        'Fast, accessible interfaces that match your brand and feel great on every screen size.',
    highlights: ['React & Next.js', 'Tailwind & motion', 'Pixel-accurate UI'],
    icon: FaReact,
  },
  {
    title: 'Backend & REST APIs',
    description:
        'Reliable server logic and APIs your frontend (and future mobile apps) can trust.',
    highlights: ['Node & Express', 'JWT / OAuth', 'Validation & error handling'],
    icon: FaServer,
  },
  {
    title: 'Responsive design',
    description:
        'Interfaces that adapt cleanly across mobile, tablet, and desktop without extra rework.',
    highlights: ['Mobile-first layouts', 'Cross-device testing', 'Consistent UX at every breakpoint'],
    icon: FaMobileAlt,
  },
  {
    title: 'Database & data modeling',
    description:
        'Structured MongoDB schemas and queries that stay maintainable as your product grows.',
    highlights: ['Schema design', 'Indexing & performance', 'Clean integrations'],
    icon: FaDatabase,
  },
] as const;

export const projectsData = [
  {
    title: 'Hair Transplant Management System',
    description: 'Full-stack web application for managing hair transplant clinics. Features include patient registration, appointment scheduling, treatment tracking, and inventory management with an intuitive interface for clinic staff.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    imageUrl: HLMS,
    url: '',
    github: '',
  },
  {
    title: 'EQUIGENIX',
    description: 'Web platform for Arabian horse judges to train, test, and analyze their performance in show competitions. Built with full-stack technologies for real-time performance tracking.',
    tags: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'AWS'],
    imageUrl: Favicon,
    url: 'https://app.staging.equijudge.ai/',
    github: ''
  },
  {
    title: 'Portfolio',
    description: 'Interactive portfolio website built with Three.js and Framer Motion to showcase software development work with engaging 3D animations and smooth transitions.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    imageUrl: portfolio,
    url: 'https://osamaayubportfoliowebsite.netlify.app/',
    github: 'https://github.com/osamaayub/3D-Developer-Portfolio',
  },
  {
    title: 'AI Powered Interviewer',
    description: 'AI-powered interview preparation platform that simulates real-world interview scenarios with voice interaction and provides automated feedback using Google Gemini and Vapi.',
    tags: ['Next.js', 'Vapi', 'Google Gemini', 'Tailwind CSS', 'Firebase'],
    imageUrl: PrepWise,
    url: 'https://interview-preparation-psi-rosy.vercel.app/sign-in',
    github: 'https://github.com/osamaayub/Interview-Preparation',
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
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Git',
  'GitHub',
  'Tailwind CSS',
  'Redux',
  'JWT',
  'OAuth',
  'Responsive Web Design',
  'API Development',
  'Database Design',
  'Full-Stack Development',
  'Agile/Scrum',
  'Problem Solving',
  'Clean Code',
  'Version Control',
] as const;