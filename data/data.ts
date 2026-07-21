import { CgWorkAlt } from 'react-icons/cg';
import {
  FaDatabase,
  FaLayerGroup,
  FaMobileAlt,
  FaReact,
  FaServer,
  FaTools,
} from 'react-icons/fa';
import portfolio from '@/public/3dportfolio.png';
import JobLane from "@/public/jobLane.png";
import Favicon from "@/public/Equigenix.png"
import Sensviz from '@/public/sensviz.jpeg'
import Ifatech from '@/public/Ifatech.jpeg'
import Narsun from "@/public/Narsun.jpeg"
import HLMS from "@/public/HLMS.png"
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
    title: 'Associate Software Engineer',
    location: 'SensViz, Lahore, PK',
    description:
      'Built and maintained full-stack web products on the MERN stack. Delivered REST APIs, MongoDB data models, and responsive React interfaces. Collaborated on production features with attention to performance, code quality, and clear UI/UX.',
    date: 'Aug 2025 - Jul 2026',
    icon: CgWorkAlt,
    logo: Sensviz,
  },
  {
    title: 'Full-Stack Developer',
    location: 'IIFATECH, Lahore, PK',
    description:
      'Developed client-facing applications with React, TypeScript, Tailwind CSS, and MongoDB. Integrated backend services, improved application structure, and shipped features from design through deployment.',
    date: 'Aug 2024 - Oct 2024',
    icon: FaReact,
    logo: Ifatech,
  },
  {
    title: 'MERN Stack Developer',
    location: 'Narsun Studios, Lahore, PK',
    description:
      'Worked across the stack for six months on web applications using React, Node.js, Express, and MongoDB. Gained solid full-stack delivery experience in an agile team environment.',
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
    description:'Hair Transplant Management System is a web application designed to streamline the management of hair transplant clinics. It offers features such as patient registration, appointment scheduling, treatment tracking, and inventory management. The system provides an intuitive interface for clinic staff to efficiently manage patient information, appointments, and treatment plans.',
    tags: ['React','Node','express','Mongodb'],
    imageUrl: HLMS,
    url: '',
    github: '',
  },
  {
    title: 'EQUIGENIX',
    description: 'Web platform for Arabian horse judges to train, test, and analyze their performance in show competitions.',
    tags: ['REACT', 'NODE', 'TYPESCRIPT','MONGODB','EXPRESS','GIT','AWS'],
    imageUrl: Favicon,
    url: 'https://app.staging.equijudge.ai/',
    github :''
  },
  {
    title: 'Portfolio',
    description: 'Portfolio website built using Three.js and Framer Motion to showcase my work interactively.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Three.js', 'Framer Motion'],
    imageUrl: portfolio,
    url: 'https://osamaayubportfoliowebsite.netlify.app/',
    github: 'https://github.com/osamaayub/3D-Developer-Portfolio',
  },
  {
    title: 'JobLane',
    description: 'JobLane is a job portal built with the MERN stack. Job seekers can browse and apply for jobs, and employers can post openings and manage applications.',
    tags: ['React', 'Node', 'Express', 'Tailwind', 'MongoDB'],
    imageUrl: JobLane,
    url: '', 
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
  'Github',
  'JWT',
  'OAUTH',
  'Responsive Web Designs(RWD)',
  'Tailwind',
  'MongoDB',
  'Redux',
  'Express',
  'Framer Motion',
] as const;