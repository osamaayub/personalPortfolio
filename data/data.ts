import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import Twitter from '@/public/Twitter.png';
import portfolio from '@/public/3dportfolio.png';
import JobLane from "@/public/jobLane.png";
import Favicon from "@/public/Equigenix.png"
import Sensviz from '@/public/sensviz.jpeg'
import Ifatech from '@/public/Ifatech.jpeg'
import Narsun from "@/public/Narsun.jpeg"
export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'About', hash: '#about' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Skills', hash: '#skills' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Contact', hash: '#contact' },
] as const;

export const experiencesData = [
  {
    title: 'Junior Software Engineer',
    location: 'SensViz, Lahore, PK',
    description: "I’m a Junior Software Engineer and aspiring Full-Stack Developer with hands-on experience in the MERN stack. I build responsive, performance-driven web applications with clean UI and maintainable backend logic. I’m passionate about learning, writing readable code, and applying best practices to deliver reliable software solutions.",
    date: 'AUG 2025 - present',
    icon:CgWorkAlt,
    logo:Sensviz,
  },
  {
    title: 'MERNSTACK Developer',
    location: 'Narsun Studios, Lahore',
    description: 'I worked as a full-stack developer for 6 months. I also upskilled to become a full-stack developer.',
    date: 'Jan 2024 - Apr 2024',
    icon: CgWorkAlt,
    logo:Narsun
  },
  {
    title: 'Full-Stack Developer',
    location: 'IIFATECH, Lahore',
    description: "I'm now a full-stack developer working at IIFATECH. My stack includes React, TypeScript, Tailwind, and MongoDB. I'm open to full-time opportunities.",
    date: 'Aug 2024 - Oct 2024',
    icon: FaReact,
    logo:Ifatech
  },
] as const;
export const projectsData = [
  {
    title: 'Twitter Clone',
    description: 'It was a clone of the Twitter website built using Bootstrap. Fully responsive and developed during my internship at Narsun Studios.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
    imageUrl: Twitter,
    url: 'https://osamaayub.github.io/TwitterClone/',
    github: 'https://github.com/osamaayub/TwitterClone',
  },
  {
    title: 'EQUIGENIX',
    description: 'Web platform for Arabian horse judges to train, test, and analyze their performance in show competitions.',
    tags: ['REACT', 'NODE', 'TYPESCRIPT','MONGODB','EXPRESS','GIT','AWS'],
    imageUrl: Favicon,
    url: 'https://app.equijudge.ai/',
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
  'Tailwind',
  'MongoDB',
  'Redux',
  'Express',
  'Framer Motion',
] as const;
