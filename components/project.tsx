
'use client';

import { useRef } from 'react';
import { projectsData } from '@/data/data';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

type ProjectProps = (typeof projectsData)[number];

const Project = ({ title, description, tags, imageUrl, url, github }: ProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className='group mb-3 sm:mb-8 last:mb-0'
    >
      <section className='bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[22rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20'>
        <div className='pt-4 pb-6 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]'>
          <h3 className='text-2xl font-semibold'>{title}</h3>
          <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>
            {description}
          </p>

          <ul className='flex flex-wrap mt-4 gap-2'>
            {tags.map((tag, index) => (
              <li
                key={index}
                className='bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70'
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className='mt-4 flex gap-2 flex-wrap items-center text-sm'>
            {url && (
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all duration-300'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.5v15m7.5-7.5h-15'
                  />
                </svg>
                Live Demo
              </a>
            )}
            {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='w-4 h-4'
                >
                  <path d='M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.26 1.87 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0C16.7 5.1 17.7 5.42 17.7 5.42c.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.83.58A12 12 0 0012 0z' />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>

        <Image
          src={imageUrl}
          alt='Project image'
          quality={95}
          className='absolute hidden sm:block top-8 -right-40 w-[28rem] rounded-t-lg shadow-2xl transition 
          group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2
          group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2
          group-even:right-[initial] group-even:-left-40'
        />
      </section>
    </motion.div>
  );
};

export default Project;
