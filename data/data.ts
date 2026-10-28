import portfolio from '@/public/3dportfolio.png';
import DevFlow from '@/public/devflow.png';
import PrepWise from "@/public/PrepWise.png";
import Favicon from "@/public/Equigenix.png";
import HLMS from "@/public/HLMS.png";

export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'About', hash: '#about' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Skills', hash: '#skills' },
  { name: 'Services', hash: '#services' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Contact', hash: '#contact' },
] as const;

export const projectsData = [
  {
    title: 'DevFlow',
    description: 'A community-driven platform for developers to ask questions, share answers, and explore topics. Discover discussions through tags, save useful knowledge in collections, and connect with the developer community.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Tailwind CSS', 'OpenAI'],
    imageUrl: DevFlow,
    url: 'https://dev-flow-kappa-seven.vercel.app/',
    github: 'https://github.com/osamaayub/DevFlow',
  },
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
