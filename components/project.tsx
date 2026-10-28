'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { PublicProject } from '@/lib/types';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';

type ProjectProps = PublicProject & { wide?: boolean };

const Project = ({ title, description, tags, image, url, github, wide }: ProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const rotateX = useSpring(0, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24 });

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        scale: reduceMotion ? 1 : scaleProgess,
        opacity: reduceMotion ? 1 : opacityProgess,
        perspective: 1200,
      }}
      className={`group h-full ${wide ? 'md:col-span-2' : ''}`}
    >
      <div className='h-full rounded-3xl bg-gradient-to-br from-gray-200/80 to-gray-200/80 p-px transition-colors duration-300 group-hover:from-indigo-400 group-hover:to-fuchsia-400 dark:from-white/10 dark:to-white/10 dark:group-hover:from-indigo-400/70 dark:group-hover:to-fuchsia-400/70'>
      <motion.article
        style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}
        onPointerMove={(event) => {
          if (reduceMotion || event.pointerType !== 'mouse') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          rotateX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 6);
          rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
        }}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        className={`spotlight relative flex h-full flex-col overflow-hidden  ${wide ? 'md:flex-row' : ''}  rounded-[calc(1.5rem-1px)] bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/15 dark:bg-slate-900`}
      >
        <div className={`relative shrink-0 overflow-hidden border-b ${wide ? 'aspect-[16/10] md:aspect-auto md:min-h-[22rem] md:w-3/5 md:border-b-0 md:border-r' : 'aspect-[16/10]'}  border-gray-200/60 bg-slate-100 dark:border-white/10 dark:bg-slate-950`}>
          {image ? (
            <Image
              src={image}
              alt={`${title} project preview`}
              fill
              sizes={wide ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw'}
              className='object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105'
            />
          ) : (
            // Projects saved without an image get a tile instead of an empty src.
            <div
              aria-hidden='true'
              className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-violet-100 to-fuchsia-100 text-6xl font-bold text-indigo-300 dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 dark:text-indigo-700'
            >
              {title.charAt(0).toUpperCase()}
            </div>
          )}
          <div aria-hidden='true' className='pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </div>
        <div className='flex flex-1 flex-col p-6 lg:p-8'>
          <h3 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>{title}</h3>
          <p className={`mt-3 leading-relaxed text-gray-700 dark:text-white/70 ${wide ? '' : 'line-clamp-4'}`}>
            {description}
          </p>

          <ul className='flex flex-wrap mt-4 gap-2'>
            {tags.map((tag) => (
              <li
                key={tag}
                className='rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200'
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className='mt-auto flex flex-wrap items-center gap-3 pt-6 text-sm'>
            {url && (
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View ${title} live demo (opens in a new tab)`}
                className='inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700'
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
                    d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
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
                aria-label={`View ${title} on GitHub (opens in a new tab)`}
                className='inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/10'
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

      </motion.article>
      </div>
    </motion.div>
  );
};

export default Project;